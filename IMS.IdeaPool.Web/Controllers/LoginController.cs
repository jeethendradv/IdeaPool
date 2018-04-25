using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process;
using IMS.IdeaPool.Process.Interfaces;
using IMS.IdeaPool.Web.ActionFilters;
using IMS.IdeaPool.Web.ActionFilters.Audit;
using IMS.IdeaPool.Web.Helpers;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;

namespace IMS.IdeaPool.Web.Controllers
{
    [NoCache]
    public class LoginController : BaseController
    {
        public ActionResult Index()
        {
            if (User.Identity.IsAuthenticated)
            {
                return Redirect("/Home/Index");
            }
            return View();
        }

        [HttpPost]
        public void Authenticate(string email, string password, bool remember)
        {
            UserDataObject user = ProcessFactory.GetLoginProcess().Authenticate(email, password);
            SetCookie(user, remember);
            SetSession(user);
            Audit(AuditType.USER_LOGIN, user.Id);
        }

        [HttpPost]
        public bool Activate(string code)
        {
            string email = IGenProtector.Decrypt(code);
            bool isActive = false;
            if (!string.IsNullOrEmpty(email))
            {
                isActive = ProcessFactory.GetLoginProcess().Activate(email);
            }
            return isActive;
        }

        [HttpPost]
        public void ForgotPassword(string email)
        {
            string token = ProcessFactory.GetForgotPasswordProcess().GetForgotPasswordToken(email);
            if (!string.IsNullOrEmpty(token))
            {
                MailSettings settings = GetEmailSettings();
                settings.Tos = new List<string> { email };
                string url = string.Format("{0}Resetpassword?token={1}", BaseUrl, HttpUtility.UrlEncode(token));
                ProcessFactory.GetNotificationProcess(settings, UserId).ForgotPassword(url);
            }
        }

        [HttpPost]
        public bool IsValidToken(string token)
        {
            return ProcessFactory.GetForgotPasswordProcess().IsValidPasswordToken(token);
        }

        [HttpPost]
        public void ResetPasswordWithToken(string token, string password, string repassword)
        {
            IForgotPasswordProcess process = ProcessFactory.GetForgotPasswordProcess();
            process.ResetPassword(token, password, repassword);
            int userId = process.Get(token).UserId;
            process.DeletePasswordToken(token);
            Audit(AuditType.PASSWORD_RESET, userId, "Reset password with token");
        }

        [HttpPost]
        [UserAudit(AuditType.PASSWORD_RESET)]
        public void ResetPassword(string password, string repassword)
        {
            IForgotPasswordProcess process = ProcessFactory.GetForgotPasswordProcess();
            process.ResetPassword(UserId, password, repassword);
        }

        private void SetCookie(UserDataObject user, bool remember)
        {
            UserSerializeObject serializeObject = new UserSerializeObject
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                IsOwnerOrReviewer = user.IsOwnerOrReviewer
            };
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            string userData = serializer.Serialize(serializeObject);
            FormsAuthenticationTicket authTicket = new FormsAuthenticationTicket(
                1,
                user.Email,
                DateTime.Now,
                DateTime.Now.AddDays(15),
                remember,
                userData);
            string encrypTicket = FormsAuthentication.Encrypt(authTicket);
            HttpCookie cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encrypTicket)
            {
                Expires = remember ? authTicket.Expiration : DateTime.MinValue
            };
            Response.Cookies.Add(cookie);
        }

        private void SetSession(UserDataObject user)
        {
            Session[SessionKeys.USER_ID] = user.Id;
            Session[SessionKeys.COMPANY] = user.Company;
            Session[SessionKeys.EMAIL] = user.Email;
            Session[SessionKeys.FEATURE_ACCESS] = user.FeatureAccess;
            Session[SessionKeys.ISSUBSCRIPTIONENABLED] = user.IsSubscriptionEnabled;
        }

        private void Audit(AuditType type, int userId, string description = null)
        {
            AuditDataObject audit = new AuditDataObject
            {
                LoginUserId = userId,
                AuditTypeKey = type.ToString(),
                Description = description
            };
            ProcessFactory.GetAuditProcess().Insert(audit);
        }
    }
}