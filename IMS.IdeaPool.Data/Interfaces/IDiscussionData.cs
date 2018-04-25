using IMS.IdeaPool.DataObjects;
using System.Collections.Generic;

namespace IMS.IdeaPool.Data.Interfaces
{
    public interface IDiscussionData
    {
        DiscussionInfo GetDiscussion(int ideaId, int page, int pagelength);
        void InsertMessage(int ideaId, int userId, string message);
        void InsertFile(int ideaId, int userId, int fileId);
        void MarkUnread(int ideaId, List<int> userIds);
    }
}
