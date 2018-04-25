using System;
using System.Collections.Generic;

namespace IMS.IdeaPool.DataObjects
{
    public class IdeaDataObject
    {
        public IdeaDataObject()
        {
            Files = new List<FileDataObject>();
            FieldOfWater = new List<FieldOfWaterDataObject>();
        }
        public int Id { get; set; }
        public Guid UniqueId { get; set; }
        public string Title { get; set; }
        public DateTime CreateDate { get; set; }
        public List<FieldOfWaterDataObject> FieldOfWater { get; set; }
        public string Description { get; set; }
        public string DescriptionHtml { get; set; }
        public int UserId { get; set; }
        public List<FileDataObject> Files { get; set; }
        public IdeaStatusDataObject Status { get; set; }
        public string Reason { get; set; }
        public UserNameObject User { get; set; }
        public bool HasUnreadDiscussions { get; set; }
        public bool IsDraft { get; set; }
        public bool IsNew { get; set; }
    }
}