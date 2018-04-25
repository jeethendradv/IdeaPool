using System.Collections.Generic;

namespace IMS.IdeaPool.Process.Exceptions
{
    public class FormException : BusinessException
    {
        public FormException(List<int> errorcodes)
        {
            ErrorCodes = errorcodes;
        }
    }
}
