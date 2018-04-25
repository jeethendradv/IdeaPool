using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Exceptions;
using IMS.IdeaPool.Process.Interfaces;
using System.Collections.Generic;

namespace IMS.IdeaPool.Process
{
    public class DiscussionProcess : IDiscussionProcess
    {
        private IDiscussionData discussionData;
        public DiscussionProcess(IDiscussionData discussionData)
        {
            this.discussionData = discussionData;
        }

        public DiscussionInfo GetDiscussion(int ideaId, int page, int pagelength)
        {
            return discussionData.GetDiscussion(ideaId, page, pagelength);
        }

        public void InsertFile(int ideaId, int userId, int fileId)
        {
            if (ideaId == 0 || userId == 0 || fileId == 0)
            {
                throw new CustomException("Invalid Paramaters.");
            }
            discussionData.InsertFile(ideaId, userId, fileId);
        }

        public void InsertMessage(int ideaId, int userId, string message)
        {
            if (ideaId == 0 || userId == 0 || string.IsNullOrEmpty(message))
            {
                throw new CustomException("Invalid Paramaters.");
            }
            discussionData.InsertMessage(ideaId, userId, message);
        }

        public void MarkUnread(int ideaId, List<int> userIds)
        {
            if (ideaId == 0 || userIds.Count == 0)
            {
                throw new CustomException("Invalid Paramaters.");
            }
            discussionData.MarkUnread(ideaId, userIds);
        }
    }
}
