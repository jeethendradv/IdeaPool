using System;

namespace IMS.IdeaPool.Process.Exceptions
{
    public class CustomException : Exception
    {
        public CustomException() { }
        public CustomException(string message) : base(message) { }
    }
}
