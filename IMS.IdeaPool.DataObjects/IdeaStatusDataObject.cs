namespace IMS.IdeaPool.DataObjects
{
    public class IdeaStatusDataObject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public bool IsInSubmittedStatus { get; set; }
        public string Color { get; set; }
        public int CreatedByUserId { get; set; }
    }
}
