using System;

namespace IMS.IdeaPool.DataObjects
{
    public class ExceptionDataObject
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string CallStack { get; set; }
        public int? UserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UserAgent { get; set; }
        public string ExceptionType { get; set; }
    }
}
