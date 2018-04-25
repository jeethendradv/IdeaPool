using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process;
using IMS.IdeaPool.Web.Helpers;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace IMS.IdeaPool.Web.ActionFilters.Audit
{
    [AttributeUsage(AttributeTargets.Method)]
    public class IdeaAuditAttribute : ActionFilterAttribute
    {
        private int IdeaId { get; set; }
        private int FileId { get; set; }
        private AuditType auditType;
        private string IdeaParameterName { get; set; }
        private string FileIdParameterName { get; set; }

        public IdeaAuditAttribute(AuditType auditType, string ideaParamName)
        {
            this.auditType = auditType;
            IdeaParameterName = ideaParamName;
        }

        public IdeaAuditAttribute(AuditType auditType, string ideaParamName, string fileIdParamName)
        {
            this.auditType = auditType;
            IdeaParameterName = ideaParamName;
            FileIdParameterName = fileIdParamName;
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (IsValid())
            {
                IdeaId = GetIdeaId(filterContext.ActionParameters);
                if (auditType == AuditType.FILE_DOWNLOAD || auditType == AuditType.FILE_VIEW)
                {
                    FileId = GetFileId(filterContext.ActionParameters);
                }
            }
            base.OnActionExecuting(filterContext);
        }

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            if (IsValid() && IdeaId != 0 && filterContext.HttpContext.User is UserPrincipal)
            {
                UserPrincipal user = filterContext.HttpContext.User as UserPrincipal;
                AuditDataObject audit = new AuditDataObject
                {
                    IdeaId = IdeaId,
                    LoginUserId = user.Id,
                    AuditTypeKey = auditType.ToString(),
                    Description = auditType == AuditType.FILE_DOWNLOAD ? FileId.ToString() : null
                };
                ProcessFactory.GetAuditProcess().Insert(audit);
            }
        }

        private int GetIdeaId(IDictionary<string, object> parameters)
        {
            int ideaId = 0;
            object idea;
            parameters.TryGetValue(IdeaParameterName, out idea);
            if (auditType == AuditType.EDIT_IDEA)
            {                
                if (idea != null && idea is IdeaDataObject)
                {
                    ideaId = (idea as IdeaDataObject).Id;
                }
            }
            else if (auditType == AuditType.VIEW_IDEA 
                || auditType == AuditType.IDEA_STATUS_UPDATE
                || auditType == AuditType.FILE_DOWNLOAD
                || auditType == AuditType.FILE_VIEW)
            {
                if (idea != null && idea is int)
                {
                    ideaId = (int)idea;
                }
            }
            return ideaId;
        }

        private int GetFileId(IDictionary<string, object> parameters)
        {
            int fileId = 0;
            object file;
            parameters.TryGetValue(FileIdParameterName, out file);
            if (file != null && file is int)
            {
                fileId = (int)file;
            }
            return fileId;
        }

        private bool IsValid()
        {
            return auditType == AuditType.EDIT_IDEA
                || auditType == AuditType.IDEA_STATUS_UPDATE
                || auditType == AuditType.VIEW_IDEA
                || auditType == AuditType.FILE_DOWNLOAD
                || auditType == AuditType.FILE_VIEW;
        }
    }
}