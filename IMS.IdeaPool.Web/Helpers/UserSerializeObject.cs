namespace IMS.IdeaPool.Web.Helpers
{
    public class UserSerializeObject
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsOwnerOrReviewer { get; set; }
    }
}