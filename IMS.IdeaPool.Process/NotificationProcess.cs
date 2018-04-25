using IMS.IdeaPool.Data;
using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Notification;
using IMS.IdeaPool.Notification.Models;
using System.Collections.Generic;

namespace IMS.IdeaPool.Process
{
    public class NotificationProcess
    {
        private EmailNotification emailNotification;
        private int? LoginUserId { get; set; }
        MailSettings mailSettings;
        public NotificationProcess(MailSettings mailsettings, int? loginUserId)
        {
            emailNotification = new EmailNotification();
            mailSettings = mailsettings;
            LoginUserId = loginUserId == 0 ? null : loginUserId;
        }

        public void IdeaCreated(string url, int ideaId)
        {
            IdeaDataObject idea = DataFactory.GetIdeaData().Fetch(ideaId, FetchMode.LightWeight);
            string creatorEmail = ProcessFactory.GetIdeaProcess().GetCreatorEmailAddress(ideaId);
            List<string> emailAddressesOfOwners = ProcessFactory.GetUserProcess().GetOwnerEmailAddresses();
            emailAddressesOfOwners.Remove(creatorEmail);
            IdeaSubmittedModel model = new IdeaSubmittedModel
            {
                CreatedBy = string.Format("{0}, {1}", idea.User.FirstName, idea.User.LastName),
                ViewIdeaUrl = url
            };
            EmailSettings settings = MapSettings(mailSettings);
            settings.Subject = "New Idea submitted";
            settings.Tos = emailAddressesOfOwners;
            SendEmail(settings, "IdeaCreated", model);
        }

        public void ForgotPassword(string url)
        {
            SystemModel model = new SystemModel { Url = url };
            EmailSettings settings = MapSettings(mailSettings);
            settings.Subject = "Idea Generator Reset password";
            SendEmail(settings, "ResetPassword", model);
        }

        public void ActivateAccount(string url, UserDataObject user)
        {
            UserModel model = new UserModel
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Url = url
            };
            EmailSettings settings = MapSettings(mailSettings);
            settings.Tos = new List<string> { user.Email };
            settings.Subject = "Welcome to Idea Generator";
            SendEmail(settings, "ActivateAccount", model);
        }

        public void IdeaStatusUpdate(string url, int ideaId)
        {
            int userid = DataFactory.GetIdeaData().GetCreatorUserId(ideaId);
            string emailAddress = DataFactory.GetUserData().GetEmailAddress(userid);
            SystemModel model = new SystemModel { Url = url };
            EmailSettings settings = MapSettings(mailSettings);
            settings.Subject = "Idea status updated";
            settings.Tos = new List<string> { emailAddress };
            SendEmail(settings, "IdeaStatusUpdated", model);
        }

        public void IdeaUpdated(int ideaId, string updateReason, string url)
        {
            IdeaDataObject idea = DataFactory.GetIdeaData().Fetch(ideaId, FetchMode.LightWeight);
            List<string> emailAddressesOfOwners = ProcessFactory.GetUserProcess().GetOwnerEmailAddresses();
            IdeaUpdatedModel model = new IdeaUpdatedModel
            {
                Url = url,
                Reason = updateReason,
                FirstName = idea.User.FirstName,
                LastName = idea.User.LastName
            };
            EmailSettings settings = MapSettings(mailSettings);
            settings.Subject = "Idea updated";
            settings.Tos = emailAddressesOfOwners;
            SendEmail(settings, "IdeaUpdated", model);
        }

        private void SendEmail<T>(EmailSettings settings, string templateName, T model)
        {
            try
            {
                emailNotification.SendSystemEmail(settings, templateName, model);
            }
            catch(System.Exception ex)
            {
                ExceptionDataObject exceptionObject = new ExceptionDataObject
                {
                    Message = ex.Message,
                    CallStack = ex.StackTrace,
                    ExceptionType = "Email",
                    UserId = LoginUserId
                };
                ProcessFactory.GetExceptionProcess().Insert(exceptionObject);
            }
        }

        private EmailSettings MapSettings(MailSettings settings)
        {
            return new EmailSettings
            {
                EnableSsl = settings.EnableSsl,
                From = settings.From,
                Host = settings.Host,
                IsHtmlBody = settings.IsHtmlBody,
                Password = settings.Password,
                Port = settings.Port,
                Subject = settings.Subject,
                Tos = settings.Tos,
                UserName = settings.UserName
            };
        }
    }
}
