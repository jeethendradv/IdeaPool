namespace IMS.IdeaPool.Process.Exceptions
{
    public class InvalidCredentialsException : BusinessException
    {
        public InvalidCredentialsException(int errorcode)
        {
            ErrorCodes.Add(errorcode);
        }
    }
}
