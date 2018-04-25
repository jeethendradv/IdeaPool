using System;

namespace IMS.IdeaPool.DataObjects
{
    public class DiscussionDataObject
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Message { get; set; }
        public int FileId { get; set; }
        public string FileName { get; set; }
        public string FileContentType { get; set; }
        public string FileThumbnail { get; set; }
        public bool IsFile { get; set; }
        public bool IsImage { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public string CreatedDateTimeString { get; set; }
    }
}
