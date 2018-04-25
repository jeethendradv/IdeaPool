namespace IMS.IdeaPool.DataObjects
{
    public class IdeaSearchSettings : PagerSettings
    {
        public int UserId { get; set; }
        public int FieldOfWaterId { get; set; }
        public int StatusId { get; set; }
        public string SearchText { get; set; }
    }
}
