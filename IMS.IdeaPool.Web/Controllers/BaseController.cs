using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process;
using IMS.IdeaPool.Web.Helpers;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Configuration;
using System.Web.Mvc;

namespace IMS.IdeaPool.Web.Controllers
{
    public class BaseController : Controller
    {
        protected int UserId
        {
            get
            {
                int id = 0;                
                if (HttpContext.User is UserPrincipal)
                {
                    id = (HttpContext.User as UserPrincipal).Id;
                }
                return id;
            }
        }

        protected bool IsOwnerOrReviewer
        {
            get
            {
                bool isownerorreviewer = false;
                if (HttpContext.User is UserPrincipal)
                {
                    isownerorreviewer = (HttpContext.User as UserPrincipal).IsOwnerOrReviewer;
                }
                return isownerorreviewer;
            }
        }

        protected string FirstName
        {
            get
            {
                string firstname = string.Empty;
                if (HttpContext.User is UserPrincipal)
                {
                    firstname = (HttpContext.User as UserPrincipal).FirstName;
                }
                return firstname;
            }
        }

        protected string BaseUrl
        {
            get
            {
                return string.Format("{0}://{1}{2}", Request.Url.Scheme, Request.Url.Authority, Url.Content("~"));
            }
        }

        protected List<FileDataObject> FetchUploadedFiles()
        {
            List<FileDataObject> files = new List<FileDataObject>();
            for (int i = 0; i < System.Web.HttpContext.Current.Request.Files.Count; i++)
            {
                var file = System.Web.HttpContext.Current.Request.Files[i];
                MemoryStream ms = new MemoryStream();
                file.InputStream.CopyTo(ms);
                FileDataObject fileObject = new FileDataObject
                {
                    Content = ms.ToArray(),
                    ContentType = file.ContentType,
                    Name = file.FileName
                };
                files.Add(fileObject);
            }
            return files;
        }

        protected bool HasAccess(FeatureAccess featureAccess)
        {
            bool hasaccess = false;
            var features = Session[SessionKeys.FEATURE_ACCESS];
            if (features != null)
            {
                List<string> featureList = features as List<string>;
                List<string> requiredAccess = getRequiredAccessFeatureKeys(featureAccess);
                if (featureList.Find(x => requiredAccess.Contains(x)) != null)
                {
                    hasaccess = true;
                }
            }
            return hasaccess;
        }

        protected MailSettings GetEmailSettings()
        {
            SmtpSection smtpconfig = (SmtpSection)ConfigurationManager.GetSection("system.net/mailSettings/smtp");
            return new MailSettings
            {
                From = smtpconfig.From,
                Host = smtpconfig.Network.Host,
                EnableSsl = smtpconfig.Network.EnableSsl,
                IsHtmlBody = true,
                Password = smtpconfig.Network.Password,
                Port = smtpconfig.Network.Port,
                UserName = smtpconfig.Network.UserName
            };
        }

        protected void Audit(AuditDataObject audit)
        {
            ProcessFactory.GetAuditProcess().Insert(audit);
        }

        private List<string> getRequiredAccessFeatureKeys(FeatureAccess featureAccess)
        {
            return featureAccess.ToString().Split(',').Select(x => x.Trim()).ToList();
        }
    }
}