using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.Data.Keys;
using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Exceptions;
using IMS.IdeaPool.Process.Interfaces;
using IMS.IdeaPool.Process.Validators;
using System.Collections.Generic;
using System.Linq;

namespace IMS.IdeaPool.Process
{
    internal class IdeaProcess : IIdeaProcess
    {
        private IFieldofwaterData fieldOfWaterData;
        private ISettingsData settingsData;
        private IIdeasData ideaData;
        private IFileProcess fileProcess;

        public IdeaProcess(IFieldofwaterData fieldOfWaterData, 
            ISettingsData settingsData,
            IIdeasData ideaData,
            IFileProcess fileProcess)
        {
            this.fieldOfWaterData = fieldOfWaterData;
            this.settingsData = settingsData;
            this.ideaData = ideaData;
            this.fileProcess = fileProcess;
        }
        
        public List<KeyValuePair<int, string>> GetFieldOfWater()
        {
            return fieldOfWaterData.GetAllLabels();
        }

        public int Save(IdeaDataObject idea)
        {
            IdeaValidator validator = new IdeaValidator(settingsData.GetGroupSettings(SettingsKeys.IdeaForm.GroupKEY));
            if (!validator.IsValid(idea))
            {
                throw new FormException(validator.ErrorCodes);
            }
            
            foreach (var file in idea.Files)
            {
                file.Thumbnail = fileProcess.GetThumbnail(file);
            }

            return ideaData.Insert(idea);
        }

        public IdeaSearchResults GetAll(IdeaSearchSettings searchsettings, int currentUserId)
        {
            return ideaData.GetAll(searchsettings, currentUserId);
        }

        public List<SettingsDataObject> GetSettings()
        {
            SettingsGroupDataObject dataObject = settingsData.GetGroupSettings(SettingsKeys.IdeaForm.GroupKEY);
            return dataObject.Settings;
        }

        public IdeaDataObject Fetch(int ideaId, FetchMode mode)
        {
            IdeaDataObject idea = ideaData.Fetch(ideaId, mode);
            if (idea == null)
            {
                throw new CustomException("Unable to fetch Idea details.");
            }
            return idea;
        }

        public int GetCreatorUserId(int ideaId)
        {
            int userid = ideaData.GetCreatorUserId(ideaId);
            if (userid == 0)
            {
                throw new CustomException("Unable to fetch the user details for this idea.");
            }
            return userid;
        }

        public List<IdeaStatusDataObject> FetchAllActiveIdeaStatus()
        {
            return ideaData.FetchAllActiveIdeaStatus();
        }

        public List<IdeaStatusDataObject> FetchAllIdeaStatus()
        {
            return ideaData.FetchAllIdeaStatus();
        }

        public void UpdateStatus(int ideaId, int statusId, int userId)
        {
            if (ideaId == 0 || statusId == 0 || userId == 0)
            {
                throw new CustomException("Unable to update Idea status.");
            }

            if (!ideaData.UpdateStatus(ideaId, statusId, userId))
            {
                throw new CustomException("Unable to update Idea status.");
            }
        }

        public int Update(IdeaDataObject idea)
        {
            if (idea.Id == 0)
            {
                throw new CustomException("Cannot update Idea details.");
            }
            int userId = ideaData.GetCreatorUserId(idea.Id);
            if (idea.UserId != userId)
            {
                throw new PermissionException();
            }
            string statusKey = ideaData.FetchStatusKey(idea.Id);
            if (statusKey != IdeaStatusKeys.DRAFT && statusKey != IdeaStatusKeys.SUBMITTED)
            {
                throw new CustomException("Error: Idea with submitted status can only be updated.");
            }
            IdeaValidator validator = new IdeaValidator(settingsData.GetGroupSettings(SettingsKeys.IdeaForm.GroupKEY));
            if (!validator.IsValid(idea))
            {
                throw new FormException(validator.ErrorCodes);
            }
            foreach (var file in idea.Files.Where(file => file.Id == 0))
            {
                file.Thumbnail = fileProcess.GetThumbnail(file);
            }
            int id = ideaData.Update(idea);
            return id;
        }

        public void MarkRead(int ideaId, int userId)
        {
            if (userId == 0 || ideaId == 0)
            {
                throw new CustomException("Invalid Parameters.");
            }
            ideaData.MarkRead(ideaId, userId);
        }

        public string GetCreatorEmailAddress(int ideaId)
        {
            if (ideaId == 0)
            {
                throw new CustomException("Invalid Parameters.");
            }
            return ideaData.GetCreatorEmailAddress(ideaId);
        }

        public string FetchStatusKey(int ideaId)
        {
            if (ideaId == 0)
            {
                throw new CustomException("Invalid Parameters.");
            }
            return ideaData.FetchStatusKey(ideaId);
        }

        public bool IsInDraftMode(int ideaId)
        {
            if (ideaId == 0)
            {
                throw new CustomException("Invalid Parameters.");
            }
            return ideaData.IsInDraftMode(ideaId);
        }
        
        public bool TitleExists(int ideaId, string ideaName)
        {
            return ideaData.TitleExists(ideaId, ideaName);
        }

        public bool DescriptionExists(int ideaId, string description)
        {
            return ideaData.DescriptionExists(ideaId, description);
        }
    }
}
