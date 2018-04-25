using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process;
using IMS.IdeaPool.Process.Exceptions;
using IMS.IdeaPool.Web.Helpers;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Script.Serialization;
using System.Web.Security;

namespace IMS.IdeaPool.Web
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            string exceptionMessage = string.Empty;
            string exceptionType = string.Empty;
            Exception exception = Server.GetLastError();
            if (exception is BusinessException)
            {
                BusinessException businessException = (exception as BusinessException);
                if (new HttpRequestWrapper(Request).IsAjaxRequest())
                {
                    ClearAndsetResponse();
                    if (exception is InvalidCredentialsException || exception is AccountNotActivatedException)
                    {
                        Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    }
                    else
                    {
                        Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    }

                    Response.Write(JsonConvert.SerializeObject(new
                    {
                        errorcodes = businessException.ErrorCodes
                    }));
                    exceptionMessage = string.Join(",", businessException.ErrorCodes);
                    exceptionType = "Business";
                }
            }
            else if (exception is CustomException)
            {
                ClearAndsetResponse();
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                Response.Write(JsonConvert.SerializeObject(new
                {
                    errormessage = exception.Message
                }));
                exceptionMessage = exception.Message;
                exceptionType = "Custom";
            }
            else
            {
                if (new HttpRequestWrapper(Request).IsAjaxRequest())
                {
                    // System exceptions should not be shown to the user. show generic error message and write the exception.Message to log table.
                    ClearAndsetResponse();
                    Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    Response.Write(JsonConvert.SerializeObject(new
                    {
                        errormessage = "Something went wrong while processing your request!!" //exception.Message should be written to log table
                    }));
                }
                //TODO: create a custom error page for non ajax errors.
                exceptionMessage = exception.Message;
                exceptionType = "ServerError";
            }
            LogException(exceptionMessage, exceptionType, exception);
        }

        protected void Application_PostAuthenticateRequest(Object sender, EventArgs e)
        {
            UserPrincipal user = GetUserPrincipal();
            if (user != null)
            {
                HttpContext.Current.User = user;
            }            
        }

        private void LogException(string message, string type, Exception exception)
        {
            UserPrincipal user = GetUserPrincipal();
            ExceptionDataObject exceptionObject = new ExceptionDataObject
            {
                Message = message,
                CallStack = exception.StackTrace,
                ExceptionType = type,
                UserAgent = Request.UserAgent,
                UserId = user != null ? (int?)user.Id : null                
            };
            ProcessFactory.GetExceptionProcess().Insert(exceptionObject);
        }

        private UserPrincipal GetUserPrincipal()
        {
            HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
            UserPrincipal user = null;
            if (authCookie != null)
            {
                FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                UserSerializeObject serializeModel = serializer.Deserialize<UserSerializeObject>(authTicket.UserData);
                user = new UserPrincipal(authTicket.Name)
                {
                    Id = serializeModel.Id,
                    FirstName = serializeModel.FirstName,
                    LastName = serializeModel.LastName,
                    IsOwnerOrReviewer = serializeModel.IsOwnerOrReviewer
                };
            }
            return user;
        }

        private void ClearAndsetResponse()
        {
            Response.Clear();
            Response.TrySkipIisCustomErrors = true;
            Server.ClearError();
            Response.ContentType = "application/json";
        }
    }
}
