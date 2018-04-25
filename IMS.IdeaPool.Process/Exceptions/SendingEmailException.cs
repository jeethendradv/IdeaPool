using System;

namespace IMS.IdeaPool.Process.Exceptions
{
    public class SendingEmailException : Exception
    {
        public SendingEmailException(string message, Exception innerException) : base(message, innerException) { }
    }
}
