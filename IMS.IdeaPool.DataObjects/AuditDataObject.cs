namespace IMS.IdeaPool.DataObjects
{
    public class AuditDataObject
    {
        public string AuditTypeKey { get; set; }
        public int LoginUserId { get; set; }
        public int? IdeaId { get; set; }
        public string Description { get; set; }
        public int? UpdateUserId { get; set; }
    }
}
