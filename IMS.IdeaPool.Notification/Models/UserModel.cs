namespace IMS.IdeaPool.Notification.Models
{
    public class UserModel : SystemModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName
        {
            get
            {
                return string.Format("{0} {1}", FirstName, LastName);
            }
        }
    }
}
