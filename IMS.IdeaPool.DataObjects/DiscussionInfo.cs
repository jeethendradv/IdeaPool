using System.Collections.Generic;

namespace IMS.IdeaPool.DataObjects
{
    public class DiscussionInfo
    {
        public DiscussionInfo()
        {
            Discussions = new List<DiscussionDataObject>();
        }
        public int IdeaId { get; set; }
        public string Title { get; set; }
        public List<DiscussionDataObject> Discussions { get; set; }
    }
}
