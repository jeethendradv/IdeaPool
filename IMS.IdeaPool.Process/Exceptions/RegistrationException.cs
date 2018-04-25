using System.Collections.Generic;

namespace IMS.IdeaPool.Process.Exceptions
{
    public class RegistrationException : BusinessException
    {
        public RegistrationException(List<int> errorcodes)
        {
            ErrorCodes.AddRange(errorcodes);
        }
    }
}
