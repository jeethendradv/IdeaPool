using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process;
using IMS.IdeaPool.Web.Helpers;
using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace IMS.IdeaPool.Web.ActionFilters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
    public class AuthenticateAttribute : AuthorizeAttribute
    {
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            bool isAuthenticated = false;
            if (httpContext.User.Identity.IsAuthenticated)
            {
                isAuthenticated = true;
                UserPrincipal user = httpContext.User as UserPrincipal;
                if (httpContext.Session[SessionKeys.USER_ID] == null || 
                    Convert.ToInt32(httpContext.Session[SessionKeys.USER_ID]) != user.Id)
                {
                    SetSession(user.Id, httpContext);
                }
            }
            return isAuthenticated;
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            if (!filterContext.HttpContext.User.Identity.IsAuthenticated)
            {
                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    filterContext.HttpContext.Response.StatusCode = 401;
                    filterContext.HttpContext.Response.End();
                }
                else
                {
                    filterContext.Result = new RedirectToRouteResult("Default",
                        new RouteValueDictionary(new { controller = "Login", action = "Index", ReturnUrl = filterContext.HttpContext.Request.Url.PathAndQuery })
                        );
                }
            }
        }

        private void SetSession(int userId, HttpContextBase httpContext)
        {
            UserDataObject user = ProcessFactory.GetUserProcess().GetUser(userId);
            httpContext.Session[SessionKeys.USER_ID] = user.Id;
            httpContext.Session[SessionKeys.COMPANY] = user.Company;
            httpContext.Session[SessionKeys.EMAIL] = user.Email;
            httpContext.Session[SessionKeys.FEATURE_ACCESS] = user.FeatureAccess;
            httpContext.Session[SessionKeys.ISSUBSCRIPTIONENABLED] = user.IsSubscriptionEnabled;
        }
    }
}