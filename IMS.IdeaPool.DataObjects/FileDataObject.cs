using System;

namespace IMS.IdeaPool.DataObjects
{
    public class FileDataObject
    {
        private double _sizeInKb;
        public bool IsImage
        {
            get
            {
                return !string.IsNullOrEmpty(ContentType) ? 
                    ContentType.ToLowerInvariant().StartsWith("image") 
                    : false;
            }
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string ContentType { get; set; }
        public double SizeInKb
        {
            get
            {
                return _sizeInKb > 0 ? _sizeInKb : GetFileSizeInKb();
            }
            set
            {
                _sizeInKb = value;
            }
        }
        public string Size
        {
            get
            {
                return GetFileSize();
            }
        }
        public byte[] Content { get; set; }
        public byte[] Thumbnail { get; set; }
        public string ThumbnailBase64 { get; set; }
        public bool IsUploadedViaDiscussions { get; set; }
        private double GetFileSizeInKb()
        {
            return Content != null && Content.Length > 0 ? Math.Round((double)Content.Length / 1024, 2) : 0;
        }
        private string GetFileSize()
        {
            string[] type = new string[] { "Bytes", "KB", "MB", "GB" }; int typeIndex = 0;
            double size = SizeInKb * 1024;
            while (size > 900)
            {
                size /= 1024;
                typeIndex++;
            }
            string exactSize = Math.Round((size * 100) / 100, 2) + " " + type[typeIndex];
            return exactSize;
        }
    }
}
