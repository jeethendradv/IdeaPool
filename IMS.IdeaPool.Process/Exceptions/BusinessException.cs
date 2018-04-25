using System;
using System.Collections.Generic;

namespace IMS.IdeaPool.Process.Exceptions
{
    public class BusinessException : Exception
    {
        public List<int> ErrorCodes { get; set; }

        public BusinessException()
        {
            ErrorCodes = new List<int>();
        }

        public BusinessException(List<int> errorCodes)
        {
            ErrorCodes = errorCodes;
        }
    }
}
