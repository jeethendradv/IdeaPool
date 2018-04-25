using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process;
using IMS.IdeaPool.Web.Helpers;
using System.Collections.Generic;
using System.Web.Mvc;

namespace IMS.IdeaPool.Web.ActionFilters.Audit
{
    public class UserAuditAttribute : ActionFilterAttribute
    {
        private int? UserId { get; set; }
        private string Description { get; set; }
        private AuditType auditType;
        private string UserParameterName { get; set; }

        public UserAuditAttribute(AuditType auditType)
        {
            this.auditType = auditType;
        }

        public UserAuditAttribute(AuditType auditType, string userParamName)
        {
            this.auditType = auditType;
            UserParameterName = userParamName;
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (IsValid())
            {
                UserId = GetUserId(filterContext.ActionParameters);
                Description = GetDescription(filterContext.ActionParameters);
            }
            base.OnActionExecuting(filterContext);
        }

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            if (IsValid() 
                && 
                (
                    UserId != null 
                    || auditType == AuditType.USER_PROFILE_UPDATE 
                    || auditType == AuditType.PASSWORD_RESET
                    || auditType == AuditType.USER_LOGOUT
                )
                && filterContext.HttpContext.User is UserPrincipal)
            {
                UserPrincipal loggedInUser = filterContext.HttpContext.User as UserPrincipal;
                AuditDataObject audit = new AuditDataObject
                {
                    LoginUserId = loggedInUser.Id,
                    UpdateUserId = UserId,
                    AuditTypeKey = auditType.ToString(),
                    Description = Description
                };
                ProcessFactory.GetAuditProcess().Insert(audit);
            }
        }

        private int? GetUserId(IDictionary<string, object> parameters)
        {
            int? userId = null;
            object user;            
            if (auditType == AuditType.VIEW_USER_DETAILS
                || auditType == AuditType.USER_ACTIVATED
                || auditType == AuditType.USER_DEACTIVATED
                || auditType == AuditType.USER_LOGIN_ACTIVE
                || auditType == AuditType.USER_LOGIN_DEACTIVE
                || auditType == AuditType.ADD_USER_ROLE
                || auditType == AuditType.REMOVE_USER_ROLE)
            {
                parameters.TryGetValue(UserParameterName, out user);
                if (user != null && user is int)
                {
                    userId = (int)user;
                }
            }
            return userId;
        }

        private string GetDescription(IDictionary<string, object> parameters)
        {
            string description = null;
            object key;
            parameters.TryGetValue("key", out key);
            if (key != null)
            {
                if (auditType == AuditType.ADD_USER_ROLE)
                {
                    description = string.Format("Added role with key {0}", key);
                }
                else if (auditType == AuditType.REMOVE_USER_ROLE)
                {
                    description = string.Format("Removed role with key {0}", key);
                }
            }
            return description;
        }

        private bool IsValid()
        {
            return auditType == AuditType.VIEW_USER_DETAILS
                || auditType == AuditType.USER_ACTIVATED
                || auditType == AuditType.USER_DEACTIVATED
                || auditType == AuditType.USER_LOGIN_ACTIVE
                || auditType == AuditType.USER_LOGIN_DEACTIVE
                || auditType == AuditType.ADD_USER_ROLE
                || auditType == AuditType.USER_PROFILE_UPDATE
                || auditType == AuditType.REMOVE_USER_ROLE
                || auditType == AuditType.PASSWORD_RESET
                || auditType == AuditType.USER_LOGOUT;
        }
    }
}