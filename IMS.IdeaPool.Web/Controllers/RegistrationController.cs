using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;

namespace IMS.IdeaPool.Web.Controllers
{
    public class RegistrationController : BaseController
    {
        [HttpPost]
        public int Register(UserDataObject user)
        {
            int userId = ProcessFactory.GetRegistrationProcess().Register(user);
            SendActivationEmail(user);
            return userId;
        }

        private void SendActivationEmail(UserDataObject user)
        {
            string encryptedEmail = IGenProtector.Encrypt(user.Email);
            string url = string.Format("{0}Activate?code={1}", BaseUrl, HttpUtility.UrlEncode(encryptedEmail));
            MailSettings settings = GetEmailSettings();
            ProcessFactory.GetNotificationProcess(settings, UserId).ActivateAccount(url, user);
        }
    }
}