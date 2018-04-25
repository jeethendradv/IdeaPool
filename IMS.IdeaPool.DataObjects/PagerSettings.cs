namespace IMS.IdeaPool.DataObjects
{
    public class PagerSettings
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; protected set; }
        public int PageLength { get; set; }
        public int TotalCount { get; protected set; }
    }
}
