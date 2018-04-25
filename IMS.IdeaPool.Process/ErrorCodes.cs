namespace IMS.IdeaPool.Process
{
    internal class ErrorCodes
    {
        public struct Login
        {
            public const int ERROR_USERNAME_PASSWORD_REQUIRED = 101;
            public const int ERROR_EMAIL_REQUIRED = 102;
            public const int ERROR_PASSWORD_REQUIRED = 103;
            public const int ERROR_INVALID_CREDENTIALS = 104;
            public const int ERROR_ACCOUNT_NOT_ACTIVATED = 118;
        }

        public struct Registration
        {
            public const int ERROR_FIRSTNAME_REQUIRED = 105;
            public const int ERROR_LASTNAME_REQUIRED = 106;            
            public const int ERROR_COMPANY_REQUIRED = 110;
            public const int ERROR_EMAIL_REQUIRED = 111;
            public const int ERROR_EMAIL_INVALID = 114;
            public const int ERROR_EMAIL_IS_REGISTERED = 113;
            public const int ERROR_PHONE_REQUIRED = 112;
            public const int ERROR_PHONE_INVALID = 117;
        }

        public struct ForgotPassword
        {
            public const int ERROR_EMAIL_REQUIRED = 111;
        }

        public struct Password
        {
            public const int ERROR_PASSWORD_REQUIRED = 107;
            public const int ERROR_PASSWORD_DO_NOT_MATCH = 109;
            public const int ERROR_PASSWORD_STRENGTH = 116;
            public const int ERROR_REPASSWORD_REQUIRED = 108;
        }
        
        public struct IdeaForm
        {
            public const int ERROR_IDEAFORM_TITLE_REQUIRED = 119;
            public const int ERROR_IDEAFORM_TITLE_LENGTH = 120;
            public const int ERROR_IDEAFORM_FIELDOFWATER_REQUIRED = 115;
            public const int ERROR_IDEAFORM_FIELDOFWATER_OTHER_REQUIRED = 123;
            public const int ERROR_IDEAFORM_DESCRIPTION_REQUIRED = 121;
            public const int ERROR_IDEAFORM_DESCRIPTION_LENGTH = 120;
            public const int ERROR_IDEAFORM_FILE_LIMIT = 122;
        }
    }
}
