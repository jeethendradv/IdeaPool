using IMS.IdeaPool.Data.Interfaces;

namespace IMS.IdeaPool.Data
{
    public static class DataFactory
    {
        public static IUserData GetUserData()
        {
            return new UserData();
        }

        public static IFileData GetImageData()
        {
            return new FileData();
        }

        public static IFieldofwaterData GetFieldofwaterData()
        {
            return new FieldOfWaterData();
        }

        public static IUserForgotPassword GetUserForgotPassword()
        {
            return new UserForgotPassword();
        }

        public static ISettingsData GetSettingsData()
        {
            return new SettingsData();
        }

        public static IIdeasData GetIdeaData()
        {
            return new IdeasData(new FieldOfWaterData(), new FileData());
        }

        public static IDiscussionData GetDiscussionData()
        {
            return new DiscussionData();
        }

        public static IExceptionData GetExceptionData()
        {
            return new ExceptionData();
        }

        public static IAuditData GetAuditData()
        {
            return new AuditData();
        }

        public static IIdeaStatusData GetIdeaStatusData()
        {
            return new IdeaStatusData();
        }
    }
}
