using System.Collections.Generic;

namespace IMS.IdeaPool.DataObjects
{
    public class UserSearchResults
    {
        public int TotalCount { get; set; }
        public List<UserBase> Results { get; set; }
    }
}
