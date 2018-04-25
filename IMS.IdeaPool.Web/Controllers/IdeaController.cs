using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process;
using IMS.IdeaPool.Process.Exceptions;
using IMS.IdeaPool.Process.Interfaces;
using IMS.IdeaPool.Web.ActionFilters;
using IMS.IdeaPool.Web.ActionFilters.Audit;
using IMS.IdeaPool.Web.Helpers;
using Rotativa;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Mvc;

namespace IMS.IdeaPool.Web.Controllers
{
    [Authenticate]
    public class IdeaController : BaseController
    {
        [HasAccess(FeatureAccess.SUBMIT_IDEA)]
        public JsonResult GetFieldOfWater()
        {
            return Json(ProcessFactory.GetIdeaProcess().GetFieldOfWater(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateInput(false)]
        [HasAccess(FeatureAccess.SUBMIT_IDEA)]
        public void Save(IdeaDataObject idea)
        {
            idea.Files.AddRange(FetchUploadedFiles());
            idea.UserId = UserId;
            int id = ProcessFactory.GetIdeaProcess().Save(idea);
            if (!idea.IsDraft)
            {
                NotifyOwners(id);
            }
        }

        [HttpPost]
        [ValidateInput(false)]
        [HasAccess(FeatureAccess.SUBMIT_IDEA)]
        [IdeaAudit(AuditType.EDIT_IDEA, "Idea" )]
        public void Update(IdeaDataObject idea)
        {
            idea.Files.AddRange(FetchUploadedFiles());
            idea.UserId = UserId;
            IIdeaProcess process = ProcessFactory.GetIdeaProcess();
            bool isInDraftModeBeforeUpdate = process.IsInDraftMode(idea.Id);
            int id = process.Update(idea);
            if (!idea.IsDraft)
            {
                if (isInDraftModeBeforeUpdate)
                {
                    NotifyOwners(id);
                }
                else
                {
                    NotifyIdeaUpdate(id, idea.Reason);
                }
            }
        }

        [HttpPost]
        [ValidateInput(false)]
        [HasAccess(FeatureAccess.SUBMIT_IDEA | FeatureAccess.VIEW_IDEAS_OF_OTHERS)]
        public int UploadFile(int ideaId)
        {
            List<FileDataObject> files = FetchUploadedFiles();
            FileDataObject file = files.Single();
            file.IsUploadedViaDiscussions = true;
            return ProcessFactory.GetFileProcess().Insert(file, ideaId, UserId);
        }

        [HasAccess(FeatureAccess.SUBMIT_IDEA)]
        public JsonResult GetSettings()
        {
            Dictionary<string, string> settings = ProcessFactory.GetIdeaProcess()
                .GetSettings()
                .ToDictionary(x => x.Key, y => y.Value);
            return Json(settings);
        }

        [HttpPost]
        [HasAccess(FeatureAccess.VIEW_IDEAS | FeatureAccess.VIEW_IDEAS_OF_OTHERS)]
        public JsonResult FetchAll(IdeaSearchSettings searchsettings)
        {
            bool hasAccessToOthersIdeas = HasAccess(FeatureAccess.VIEW_IDEAS_OF_OTHERS);
            if (!hasAccessToOthersIdeas)
            {
                searchsettings.UserId = UserId;
            }
            IdeaSearchResults searchresults = ProcessFactory.GetIdeaProcess().GetAll(searchsettings, UserId);
            SearchResults results = new SearchResults(searchresults.TotalCount, searchsettings.PageLength)
            {
                Rows = searchresults.Results.Select(idea => MapForDisplay(idea, hasAccessToOthersIdeas)).ToList(),
                CurrentPage = searchsettings.CurrentPage
            };
            return Json(results);
        }

        [HasAccess(FeatureAccess.VIEW_IDEAS)]
        [IdeaAudit(AuditType.VIEW_IDEA, "id")]
        public JsonResult FetchIdeaDetails(int id)
        {
            IIdeaProcess ideaprocess = ProcessFactory.GetIdeaProcess();
            if (ideaprocess.GetCreatorUserId(id) != UserId && !HasAccess(FeatureAccess.VIEW_IDEAS_OF_OTHERS))
            {
                throw new PermissionException();
            }
            IdeaDataObject idea = ideaprocess.Fetch(id, FetchMode.Full);
            return Json(idea, JsonRequestBehavior.AllowGet);
        }

        public JsonResult FetchIdeaStatus()
        {
            return Json(ProcessFactory.GetIdeaProcess().FetchAllActiveIdeaStatus(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [HasAccess(FeatureAccess.UPDATE_IDEA_STATUS)]
        [IdeaAudit(AuditType.IDEA_STATUS_UPDATE, "ideaId")]
        public void UpdateStatus(int ideaId, int statusId)
        {
            ProcessFactory.GetIdeaProcess().UpdateStatus(ideaId, statusId, UserId);
            NotifyUserOfStatusUpdate(ideaId);
        }

        [HasAccess(FeatureAccess.VIEW_IDEAS)]
        [IdeaAudit(AuditType.FILE_VIEW, "ideaId", "imageId")]
        public ActionResult DisplayImage(int ideaId, int imageId)
        {
            IIdeaProcess ideaprocess = ProcessFactory.GetIdeaProcess();
            if (ideaprocess.GetCreatorUserId(ideaId) != UserId && !HasAccess(FeatureAccess.VIEW_IDEAS_OF_OTHERS))
            {
                throw new PermissionException();
            }
            FileDataObject file = ProcessFactory.GetFileProcess().Fetch(ideaId, imageId);
            if (!file.IsImage)
            {
                throw new CustomException("Image not found");
            }

            return File(new MemoryStream(file.Content), file.ContentType);
        }

        [HasAccess(FeatureAccess.VIEW_IDEAS)]
        [IdeaAudit(AuditType.FILE_DOWNLOAD, "ideaId", "fileId")]
        public FileResult Download(int ideaId, int fileId)
        {
            IIdeaProcess ideaprocess = ProcessFactory.GetIdeaProcess();
            if (ideaprocess.GetCreatorUserId(ideaId) != UserId && !HasAccess(FeatureAccess.VIEW_IDEAS_OF_OTHERS))
            {
                throw new PermissionException();
            }
            FileDataObject file = ProcessFactory.GetFileProcess().Fetch(ideaId, fileId);
            return File(file.Content, System.Net.Mime.MediaTypeNames.Application.Octet, file.Name);
        }

        public JsonResult FetchDiscussions(int ideaId, int page, int pagelength)
        {
            DiscussionInfo info = ProcessFactory.GetDiscussionProcess().GetDiscussion(ideaId, page, pagelength);
            return Json(info);
        }

        [HttpPost]
        public void MarkRead(int ideaId)
        {
            ProcessFactory.GetIdeaProcess().MarkRead(ideaId, UserId);
        }
        
        [HasAccess(FeatureAccess.EXPORT_IDEAS)]
        public FileContentResult Export(int fieldOfWaterId, int statusId, int userId, string searchText, string exportType)
        {
            ExportResult result = null;
            if (exportType == "pdf")
            {
                object routevalues = new { fieldOfWaterId, statusId, userId, searchText };
                ActionAsPdf pdf = new ActionAsPdf("SearchResultsHtml", routevalues);
                byte[] pdfResult = pdf.BuildPdf(ControllerContext);
                result = new ExportResult
                {
                    ResultBytes = pdfResult,
                    ContentType = "application/pdf",
                    FileName = "Ideas.pdf"
                };
            }
            else
            {
                ExportCriteria criteria = new ExportCriteria
                {
                    UserId = userId,
                    FieldOfWaterId = fieldOfWaterId,
                    StatusId = statusId,
                    SearchText = searchText,
                    ExportType = exportType
                };
                result = ProcessFactory.GetExportProcess().Export(criteria, UserId);
            }
            AuditDataObject audit = new AuditDataObject
            {
                AuditTypeKey = AuditType.IDEAS_EXPORT.ToString(),
                LoginUserId = UserId,
                Description = string.Format("Exported ideas to {0} format", exportType)
            };
            Audit(audit);
            return File(result.ResultBytes, result.ContentType, result.FileName);
        }

        [HasAccess(FeatureAccess.VIEW_IDEAS_OF_OTHERS)]
        public ActionResult SearchResultsHtml(int fieldOfWaterId, int statusId, int userId, string searchText)
        {
            IdeaSearchSettings searchSettings = new IdeaSearchSettings
            {
                PageLength = 0,
                FieldOfWaterId = fieldOfWaterId,
                StatusId = statusId,
                UserId = userId,
                SearchText = searchText
            };
            IdeaSearchResults searchresults = ProcessFactory.GetIdeaProcess().GetAll(searchSettings, UserId);
            return View(searchresults);
        }

        [HasAccess(FeatureAccess.SUBMIT_IDEA)]
        public bool TitleExists(int id, string ideaName)
        {
            return ProcessFactory.GetIdeaProcess().TitleExists(id, ideaName);
        }

        public bool DescriptionExists(int id, string description)
        {
            return ProcessFactory.GetIdeaProcess().DescriptionExists(id, description);
        }

        private void NotifyOwners(int id)
        {
            string url = string.Format("{0}Idea/View/{1}", BaseUrl, id);
            MailSettings settings = GetEmailSettings();
            ProcessFactory.GetNotificationProcess(settings, UserId).IdeaCreated(url, id);
        }

        private void NotifyUserOfStatusUpdate(int id)
        {
            string url = string.Format("{0}Idea/View/{1}", BaseUrl, id);
            MailSettings settings = GetEmailSettings();
            ProcessFactory.GetNotificationProcess(settings, UserId).IdeaStatusUpdate(url, id);
        }

        private void NotifyIdeaUpdate(int id, string reason)
        {
            string url = string.Format("{0}Idea/View/{1}", BaseUrl, id);
            MailSettings settings = GetEmailSettings();
            ProcessFactory.GetNotificationProcess(settings, UserId).IdeaUpdated(id, reason, url);
        }

        private object MapForDisplay(IdeaDataObject idea, bool hasAccessToOthersIdeas)
        {
            return new
            {
                idea.Id,
                SubmitDate = idea.CreateDate.ToShortDateString(),
                idea.Title,
                FieldOdWater = idea.FieldOfWater.Select(x => x.Name),
                Status = new
                {
                    idea.Status.Name,
                    idea.Status.Color
                },
                CreatedBy = hasAccessToOthersIdeas ? string.Format("{0}, {1}", idea.User.FirstName, idea.User.LastName) : string.Empty,
                CanEdit = idea.UserId == UserId && (idea.Status.IsInSubmittedStatus || idea.IsDraft),
                idea.HasUnreadDiscussions,
                idea.IsDraft
            };
        }
    }
}