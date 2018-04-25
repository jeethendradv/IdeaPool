namespace IMS.IdeaPool.Process.Exceptions
{
    public class PasswordTokenExpiredException : CustomException
    {
        public PasswordTokenExpiredException() : base("Reset password link has expired.") { }
    }
}
