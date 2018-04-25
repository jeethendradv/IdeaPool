using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process;
using IMS.IdeaPool.Web.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IMS.IdeaPool.Web.ActionFilters.Audit
{
    [AttributeUsage(AttributeTargets.Method)]
    public class SettingsAuditAttribute : ActionFilterAttribute
    {
        private AuditType auditType;
        private string description;
        public SettingsAuditAttribute(AuditType auditType, string description)
        {
            this.auditType = auditType;
            this.description = description;
        }

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            if (IsValid() && filterContext.HttpContext.User is UserPrincipal)
            {
                UserPrincipal user = filterContext.HttpContext.User as UserPrincipal;
                AuditDataObject audit = new AuditDataObject
                {
                    LoginUserId = user.Id,
                    AuditTypeKey = auditType.ToString(),
                    Description = description
                };
                ProcessFactory.GetAuditProcess().Insert(audit);
            }
        }

        private bool IsValid()
        {
            return auditType == AuditType.FIELDOFWATER_ACTIVATED
                || auditType == AuditType.FIELDOFWATER_DEACTIVATED
                || auditType == AuditType.IDEASTATUS_ACTIVATED
                || auditType == AuditType.IDEASTATUS_DEACTIVATED;
        }
    }
}