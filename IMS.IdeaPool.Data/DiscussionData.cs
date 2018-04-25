using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace IMS.IdeaPool.Data
{
    internal class DiscussionData : IDiscussionData
    {
        public DiscussionInfo GetDiscussion(int ideaId, int page, int pagelength)
        {
            List<Discussion> discussions;
            Idea idea;
            using (var context = new IdeaPoolEntities())
            {
                discussions = context.Discussions
                    .Where(x => x.IdeaId == ideaId)
                    .OrderByDescending(x => x.CreateDate)
                    .Skip((page - 1) * pagelength)
                    .Take(pagelength)
                    .Include(x => x.User)
                    .Include(x => x.File)
                    .ToList();
                discussions.Reverse();

                idea = context.Ideas
                    .Where(x => x.Id == ideaId)
                    .Single();

            }
            return Map(discussions, idea);
        }

        public void InsertFile(int ideaId, int userId, int fileId)
        {
            using (var context = new IdeaPoolEntities())
            {
                Discussion discussion = new Discussion
                {
                    IdeaId = ideaId,
                    UserId = userId,
                    FileId = fileId,
                    CreateDate = DateTime.UtcNow
                };
                context.Discussions.Add(discussion);
                context.SaveChanges();
            }
        }

        public void InsertMessage(int ideaId, int userId, string message)
        {
            using (var context = new IdeaPoolEntities())
            {
                Discussion discussion = new Discussion
                {
                    IdeaId = ideaId,
                    UserId = userId,
                    Message = message,
                    CreateDate = DateTime.UtcNow
                };
                context.Discussions.Add(discussion);
                context.SaveChanges();
            }
        }

        public void MarkUnread(int ideaId, List<int> userIds)
        {
            using (var context = new IdeaPoolEntities())
            {
                foreach (int userid in userIds)
                {
                    if (!context.UnReadDiscussions.Any(x => x.UserId == userid && x.IdeaId == ideaId))
                    {
                        UnReadDiscussion unread = new UnReadDiscussion
                        {
                            IdeaId = ideaId,
                            UserId = userid
                        };
                        context.UnReadDiscussions.Add(unread);
                    }
                }
                context.SaveChanges();
            }
        }

        private DiscussionInfo Map(List<Discussion> discussions, Idea idea)
        {
            return new DiscussionInfo
            {
                IdeaId = idea.Id,
                Title = idea.Title,
                Discussions = Map(discussions)
            };
        }

        private List<DiscussionDataObject> Map(List<Discussion> discussions)
        {
            List<DiscussionDataObject> messages = new List<DiscussionDataObject>();
            foreach (Discussion discussion in discussions)
            {
                messages.Add(new DiscussionDataObject
                {
                    Id = discussion.Id,
                    FileId = discussion.FileId.HasValue ? discussion.File.Id : 0,
                    FileName = discussion.FileId.HasValue ? discussion.File.Name : string.Empty,
                    FileContentType = discussion.FileId.HasValue ? discussion.File.ContentType : string.Empty,
                    FileThumbnail = discussion.FileId.HasValue ? Convert.ToBase64String(discussion.File.Thumbnail) : string.Empty,
                    IsFile = discussion.FileId.HasValue,
                    IsImage = discussion.FileId.HasValue ? discussion.File.ContentType.ToLowerInvariant().StartsWith("image") : false,
                    CreatedDateTime = discussion.CreateDate.ToLocalTime(),
                    CreatedDateTimeString = string.Format("{0} {1}", discussion.CreateDate.ToLocalTime().ToShortDateString(), discussion.CreateDate.ToLocalTime().ToShortTimeString()),
                    Message = discussion.Message,
                    UserId = discussion.UserId,
                    UserName = string.Format("{0}, {1}", discussion.User.FirstName, discussion.User.LastName)
                });
            }
            return messages; 
        }
    }
}
