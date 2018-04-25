using IMS.IdeaPool.Data;
using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Interfaces;

namespace IMS.IdeaPool.Process
{
    public static class ProcessFactory
    {
        public static ILoginProcess GetLoginProcess()
        {
            return new LoginProcess(DataFactory.GetUserData(), DataFactory.GetUserForgotPassword());
        }

        public static IRegistrationProcess GetRegistrationProcess()
        {
            return new RegistrationProcess(DataFactory.GetUserData());
        }

        public static IFileProcess GetFileProcess()
        {
            return new FileProcess(DataFactory.GetImageData(), DataFactory.GetIdeaData(), DataFactory.GetUserData());
        }

        public static IIdeaProcess GetIdeaProcess()
        {
            return new IdeaProcess(DataFactory.GetFieldofwaterData(), 
                DataFactory.GetSettingsData(), 
                DataFactory.GetIdeaData(),
                GetFileProcess());
        }

        public static IErrorProcess GetErrorProcess()
        {
            return new ErrorProcess();
        }

        public static IForgotPasswordProcess GetForgotPasswordProcess()
        {
            return new ForgotPasswordProcess(DataFactory.GetUserData(), DataFactory.GetUserForgotPassword());
        }

        public static IUserProcess GetUserProcess()
        {
            return new UserProcess(DataFactory.GetUserData());
        }

        public static NotificationProcess GetNotificationProcess(MailSettings settings, int loggedInUserId)
        {
            return new NotificationProcess(settings, loggedInUserId);
        }

        public static ISettingsProcess GetSettingsProcess()
        {
            return new SettingsProcess(DataFactory.GetSettingsData(), DataFactory.GetFieldofwaterData(), DataFactory.GetIdeaStatusData());
        }

        public static IDiscussionProcess GetDiscussionProcess()
        {
            return new DiscussionProcess(DataFactory.GetDiscussionData());
        }

        public static IExceptionProcess GetExceptionProcess()
        {
            return new ExceptionProcess(DataFactory.GetExceptionData());
        }

        public static IExportProcess GetExportProcess()
        {
            return new ExportProcess(DataFactory.GetIdeaData());
        }

        public static IAuditProcess GetAuditProcess()
        {
            return new AuditProcess(DataFactory.GetAuditData());
        }
    }
}
