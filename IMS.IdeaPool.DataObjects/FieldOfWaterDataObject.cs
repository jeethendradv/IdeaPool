namespace IMS.IdeaPool.DataObjects
{
    public class FieldOfWaterDataObject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Order { get; set; }
        public bool IsActive { get; set; }
        public int CreatedByUserId { get; set; }
    }
}
