namespace IMS.IdeaPool.Process.Exceptions
{
    public class PermissionException : CustomException
    {
        public PermissionException() : base("Request cannot be processed due to insufficient permission.") { }
    }
}
