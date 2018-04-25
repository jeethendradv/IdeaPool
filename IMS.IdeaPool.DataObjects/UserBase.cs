using System;

namespace IMS.IdeaPool.DataObjects
{
    public class UserBase : object
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName
        {
            get
            {
                return string.Format("{0}, {1}", FirstName, LastName);
            }
        }
        public string Company { get; set; }
        public DateTime JoinedDate { get; set; }
        public int TotalIdeasSubmitted { get; set; }
    }
}
