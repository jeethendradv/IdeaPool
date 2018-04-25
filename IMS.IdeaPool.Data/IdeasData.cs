using IMS.IdeaPool.Data.Interceptor;
using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.Data.Keys;
using IMS.IdeaPool.DataObjects;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace IMS.IdeaPool.Data
{
    internal class IdeasData : IIdeasData
    {
        private IFieldofwaterData fieldOfwaterData;
        private IFileData fileData;
        private const int FIELDOFWATER_OTHER_ID = -1;
        private const int IDEASTATUS_SUBMITTED_ID = 1;

        public IdeasData(FieldOfWaterData fieldOfwaterData, FileData fileData)
        {
            this.fileData = fileData;
            this.fieldOfwaterData = fieldOfwaterData;
        }

        public IdeaSearchResults GetAll(IdeaSearchSettings searchsettings, int currentUserId)
        {
            IdeaSearchResults results = new IdeaSearchResults();
            using (var context = new IdeaPoolEntitiesFullTextSearch())
            {
                var query = context.Ideas.AsQueryable();
                query = query.Where(x => !x.IsDraft || (x.IsDraft && x.UserId == currentUserId));
                if (searchsettings.UserId != 0)
                {
                    query = query.Where(x => x.UserId == searchsettings.UserId);
                }
                if (searchsettings.FieldOfWaterId != 0)
                {
                    query = query.Where(x => x.IdeasFieldOfWaters.Any(fieldofwater => fieldofwater.FieldOfWaterId == searchsettings.FieldOfWaterId));
                }
                if (searchsettings.StatusId != 0)
                {
                    query = query.Where(x => x.IdeaStatusId == searchsettings.StatusId);
                }
                if (!string.IsNullOrEmpty(searchsettings.SearchText))
                {
                    string searchtext = FullTextSearch.Search(searchsettings.SearchText);
                    query = query.Where(x => x.Title.Contains(searchtext) || x.HtmlContent.Contains(searchtext));
                }
                results.TotalCount = query.Count();
                query = query
                    .Include(x => x.IdeasFieldOfWaters.Select(field => field.FieldOfWater))
                    .Include(x => x.IdeaStatus)
                    .Include(x => x.User)
                    .Include(x => x.UnReadDiscussions)
                    .OrderByDescending(x => x.CreatedDate);
                if (searchsettings.PageLength != 0)
                {
                    query = query
                       .Skip((searchsettings.CurrentPage - 1) * searchsettings.PageLength)
                       .Take(searchsettings.PageLength);
                }
                List<Idea> ideas = query.ToList();
                results.Results = MapIdeas(ideas, currentUserId);
            }
            return results;
        }

        public IdeaDataObject Fetch(int ideaId, FetchMode mode)
        {
            IdeaDataObject ideaData = null;
            using (var context = new IdeaPoolEntities())
            {
                Idea idea = null;
                var query = context.Ideas
                    .Include(x => x.User)
                    .AsQueryable();

                if (mode == FetchMode.Full)
                {
                    query = query
                        .Include(x => x.Files)
                        .Include(x => x.IdeaStatus)
                        .Include(x => x.IdeasFieldOfWaters)
                        .Include(x => x.IdeasFieldOfWaters.Select(y => y.FieldOfWater));
                }

                idea = query.SingleOrDefault(x => x.Id == ideaId);
                ideaData = MapIdea(idea, mode);
            }
            return ideaData;
        }

        public int Insert(IdeaDataObject idea)
        {
            int id = -1;
            using (var context = new IdeaPoolEntities())
            {
                int ideastatusid = context.IdeaStatus
                    .Where(x => x.Key == (idea.IsDraft ? IdeaStatusKeys.DRAFT : IdeaStatusKeys.SUBMITTED))
                    .Single().Id;
                Idea ideaData = new Idea
                {
                    Title = idea.Title,
                    HtmlContent = idea.DescriptionHtml,
                    PlainContent = idea.Description,
                    UniqueId = Guid.NewGuid(),
                    UserId = idea.UserId,
                    CreatedDate = DateTime.UtcNow,
                    LastUpdated = DateTime.UtcNow,
                    IdeaStatusId = ideastatusid,
                    IsDraft = idea.IsDraft
                };
                fieldOfwaterData.InsertIdeaFieldOfWater(context, ideaData, idea.FieldOfWater);
                fileData.Insert(context, idea.Files, ideaData);
                context.Ideas.Add(ideaData);
                context.SaveChanges();
                id = ideaData.Id;
            }
            return id;
        }

        public int Update(IdeaDataObject ideaData)
        {
            using (var context = new IdeaPoolEntities())
            {
                int ideastatusid = context.IdeaStatus
                    .Where(x => x.Key == (ideaData.IsDraft ? IdeaStatusKeys.DRAFT : IdeaStatusKeys.SUBMITTED))
                    .Single().Id;

                Idea idea = context.Ideas
                    .Where(x => x.Id == ideaData.Id)
                    .Include(x => x.Files)
                    .Include(x => x.IdeasFieldOfWaters)
                    .Single();
                bool isInDraftBeforeUpdate = idea.IsDraft;
                idea.IdeaStatusId = ideastatusid;
                idea.PlainContent = ideaData.Description;
                idea.HtmlContent = ideaData.DescriptionHtml;
                idea.Title = ideaData.Title;                
                idea.LastUpdated = DateTime.UtcNow;
                idea.IsDraft = ideaData.IsDraft;
                if (ideaData.IsNew)
                {
                    idea.CreatedDate = DateTime.UtcNow;
                }
                UpdateFiles(context, ideaData.Files, idea);
                UpdateFieldOfWater(context, ideaData.FieldOfWater, idea);
                if (!isInDraftBeforeUpdate)
                {
                    InsertIdeaHistory(context, idea.Id, idea.UserId, ActivityKeys.UPDATE_IDEA_DETAILS, ideaData.Reason);
                }
                context.Entry(idea).State = EntityState.Modified;
                context.SaveChanges();
                return idea.Id;
            }
        }

        public string FetchStatusKey(int ideaId)
        {
            using (var context = new IdeaPoolEntities())
            {
                return context.Ideas
                    .Where(idea => idea.Id == ideaId)
                    .Select(idea => idea.IdeaStatus.Key)
                    .Single();
            }
        }

        public int GetCreatorUserId(int ideaId)
        {
            int userId = 0;
            using (var context = new IdeaPoolEntities())
            {
                Idea idea = context.Ideas.Where(x => x.Id == ideaId).SingleOrDefault();
                if (idea != null)
                {
                    userId = idea.UserId;
                }
            }
            return userId;
        }

        public string GetCreatorEmailAddress(int ideaId)
        {
            string email = string.Empty;
            using (var context = new IdeaPoolEntities())
            {
                email = context.Ideas.Where(x => x.Id == ideaId)
                    .Select(i => i.User.Email)
                    .SingleOrDefault();
            }
            return email;
        }

        public List<IdeaStatusDataObject> FetchAllActiveIdeaStatus()
        {
            using (var context = new IdeaPoolEntities())
            {
                return context
                    .IdeaStatus
                    .Where(x => x.IsVisible && x.IsActive)
                    .Select(status => new IdeaStatusDataObject
                    {
                        Id = status.Id,
                        Name = status.Status
                    })
                .ToList();
            }
        }

        public bool UpdateStatus(int ideaId, int statusId, int userId)
        {
            bool isUpdate = false;
            using (var context = new IdeaPoolEntities())
            {
                Idea idea = context.Ideas.SingleOrDefault(x => x.Id == ideaId);
                IdeaStatus status = context.IdeaStatus.SingleOrDefault(x => x.Id == statusId);
                if (idea != null && status != null)
                {
                    idea.IdeaStatus = status;
                    context.Entry(idea).State = EntityState.Modified;
                    InsertIdeaHistory(context, ideaId, userId, ActivityKeys.UPDATE_IDEA_STATUS, status.Status);
                    context.SaveChanges();
                    isUpdate = true;
                }
            }
            return isUpdate;
        }

        public void MarkRead(int ideaId, int userId)
        {
            using (var context = new IdeaPoolEntities())
            {
                UnReadDiscussion discussion = context.UnReadDiscussions.SingleOrDefault(x => x.IdeaId == ideaId && x.UserId == userId);
                if (discussion != null)
                {
                    context.UnReadDiscussions.Remove(discussion);
                    context.SaveChanges();
                }
            }
        }

        public bool IsInDraftMode(int ideaId)
        {
            using (var context = new IdeaPoolEntities())
            {
                return context.Ideas
                    .Where(x => x.Id == ideaId && x.IdeaStatus.Key == IdeaStatusKeys.DRAFT)
                    .Any();
            }
        }

        public List<IdeaStatusDataObject> FetchAllIdeaStatus()
        {
            using (var context = new IdeaPoolEntities())
            {
                return context
                    .IdeaStatus
                    .Where(x => x.IsVisible)
                    .Select(status => new IdeaStatusDataObject
                    {
                        Id = status.Id,
                        Name = status.Status,
                        Description = status.Description,
                        Color = status.Color,
                        IsActive = status.IsActive
                    })
                .ToList();
            }
        }

        public bool TitleExists(int ideaId, string ideaName)
        {
            ideaName = ideaName.Trim().ToLower();
            using (var context = new IdeaPoolEntities())
            {
                return context
                    .Ideas
                    .Where(x => x.Id != ideaId &&  x.Title.Trim().ToLower() == ideaName)
                    .Count() > 0;
            }
        }

        public bool DescriptionExists(int ideaId, string description)
        {
            description = description.Trim().ToLower();
            using (var context = new IdeaPoolEntities())
            {
                return context
                    .Ideas
                    .Where(x => x.Id != ideaId && x.PlainContent.Trim().ToLower() == description)
                    .Count() > 0;
            }
        }

        private void InsertIdeaHistory(IdeaPoolEntities context, int ideaId, int userId, string activityKey, string description)
        {
            Activity ideaDetailsUpdate = context.Activities.Single(x => x.Key == activityKey);
            context.IdeaHistories.Add(new IdeaHistory
            {
                Activity = ideaDetailsUpdate,
                IdeaId = ideaId,
                UserId = userId,
                Description = description,
                CreateDate = DateTime.UtcNow
            });
        }

        private void UpdateFiles(IdeaPoolEntities context, List<FileDataObject> files, Idea ideaData)
        {
            foreach (File file in ideaData.Files.ToList())
            {
                if (!files.Any(x => x.Id == file.Id))
                {
                    context.Files.Remove(file);
                }
            }
            fileData.Insert(context, files.Where(file => file.Id == 0).ToList(), ideaData.Id);
        }

        private void UpdateFieldOfWater(IdeaPoolEntities context, List<FieldOfWaterDataObject> fieldOfWaters, Idea ideaData)
        {
            List<int> fieldOfWaterIds = new List<int>();
            foreach (IdeasFieldOfWater fieldOfWater in ideaData.IdeasFieldOfWaters.ToList())
            {
                if (!fieldOfWaters.Any(x => x.Id == fieldOfWater.FieldOfWaterId))
                {
                    context.IdeasFieldOfWaters.Remove(fieldOfWater);
                }
                else
                {
                    if (fieldOfWater.FieldOfWaterId == FIELDOFWATER_OTHER_ID)
                    {
                        var other = fieldOfWaters.Single(x => x.Id == FIELDOFWATER_OTHER_ID);
                        if (fieldOfWater.Description != other.Description)
                        {
                            fieldOfWater.Description = other.Description;
                            context.Entry(fieldOfWater).State = EntityState.Modified;
                        }
                    }
                    fieldOfWaterIds.Add(fieldOfWater.FieldOfWaterId);
                }
            }
            fieldOfwaterData.InsertIdeaFieldOfWater(context, ideaData.Id, fieldOfWaters.Where(x => !fieldOfWaterIds.Contains(x.Id)).ToList());
        }

        private List<IdeaDataObject> MapIdeas(List<Idea> ideas, int currentUserId)
        {
            List<IdeaDataObject> ideasData = new List<IdeaDataObject>();
            ideas.ForEach(idea =>
            {
                IdeaDataObject ideaData = new IdeaDataObject
                {
                    Id = idea.Id,
                    CreateDate = idea.CreatedDate.ToLocalTime(),
                    Title = idea.Title,
                    FieldOfWater = idea.IdeasFieldOfWaters.Select(x =>
                    {
                        FieldOfWaterDataObject fieldofwater = null;
                        if (x.FieldOfWaterId == FIELDOFWATER_OTHER_ID)
                        {
                            fieldofwater = new FieldOfWaterDataObject { Name = x.Description };
                        }
                        else
                        {
                            fieldofwater = new FieldOfWaterDataObject { Name = x.FieldOfWater.Name };
                        }
                        return fieldofwater;
                    }).ToList(),
                    Status = new IdeaStatusDataObject
                    {
                        Name = idea.IdeaStatus.Status,
                        Color = idea.IdeaStatus.Color,
                        IsInSubmittedStatus = idea.IdeaStatus.Key == IdeaStatusKeys.SUBMITTED
                    },
                    User = new UserNameObject
                    {
                        FirstName = idea.User.FirstName,
                        LastName = idea.User.LastName
                    },
                    UserId = idea.User.Id,
                    HasUnreadDiscussions = idea.UnReadDiscussions.Any(d => d.UserId == currentUserId),
                    IsDraft = idea.IsDraft
                };
                ideasData.Add(ideaData);
            });
            return ideasData;
        }

        private IdeaDataObject MapIdea(Idea idea, FetchMode mode)
        {
            IdeaDataObject ideaData = null;
            if (idea != null)
            {
                ideaData = new IdeaDataObject
                {
                    Id = idea.Id,
                    UniqueId = idea.UniqueId,
                    UserId = idea.UserId,
                    User = new UserNameObject
                    {
                        Id = idea.User.Id,
                        FirstName = idea.User.FirstName,
                        LastName = idea.User.LastName
                    },
                    IsDraft = idea.IsDraft
                };

                if (mode == FetchMode.Full)
                {
                    ideaData.Title = idea.Title;
                    ideaData.DescriptionHtml = idea.HtmlContent;
                    ideaData.CreateDate = idea.CreatedDate.ToLocalTime();
                    idea.Files.ToList().ForEach(file =>
                    {
                        ideaData.Files.Add(new FileDataObject
                        {
                            ThumbnailBase64 = Convert.ToBase64String(file.Thumbnail),
                            ContentType = file.ContentType,
                            Id = file.Id,
                            Name = file.Name,
                            SizeInKb = file.SizeInKb,
                            IsUploadedViaDiscussions = file.IsUploadedViaDiscussions
                        });
                    });
                    idea.IdeasFieldOfWaters.ToList().ForEach(fieldofWater =>
                    {
                        ideaData.FieldOfWater.Add(new FieldOfWaterDataObject
                        {
                            Name = fieldofWater.FieldOfWater.Name,
                            Description = fieldofWater.Description,
                            Id = fieldofWater.FieldOfWater.Id
                        });
                    });
                    ideaData.Status = new IdeaStatusDataObject
                    {
                        Id = idea.IdeaStatus.Id,
                        Name = idea.IdeaStatus.Status,
                        Color = idea.IdeaStatus.Color,
                        IsInSubmittedStatus = idea.IdeaStatus.Key == IdeaStatusKeys.SUBMITTED
                    };
                }
            }
            return ideaData;
        }
    }
}
