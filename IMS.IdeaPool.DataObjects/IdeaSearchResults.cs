using System.Collections.Generic;

namespace IMS.IdeaPool.DataObjects
{
    public class IdeaSearchResults
    {
        public int TotalCount { get; set; }
        public List<IdeaDataObject> Results { get; set; }
    }
}
