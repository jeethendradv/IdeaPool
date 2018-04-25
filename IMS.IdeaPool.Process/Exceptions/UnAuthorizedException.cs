namespace IMS.IdeaPool.Process.Exceptions
{
    public class UnAuthorizedException: CustomException
    {
        public UnAuthorizedException() : base("You are not authorized to perform this operation") { }
    }
}
