using System.Collections.Generic;

namespace IMS.IdeaPool.Process.Exceptions
{
    public class UserNameAndPasswordRequiredException : BusinessException
    {
        public UserNameAndPasswordRequiredException(List<int> errorcode)
        {
            ErrorCodes = errorcode;
        }
    }
}
