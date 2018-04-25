namespace IMS.IdeaPool.Process.Exceptions
{
    public class RequiredFieldException : BusinessException
    {
        public RequiredFieldException(int errorcode)
        {
            ErrorCodes.Add(errorcode);
        }
    }
}
