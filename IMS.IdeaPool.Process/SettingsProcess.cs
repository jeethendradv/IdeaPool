using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Exceptions;
using IMS.IdeaPool.Process.Interfaces;
using System.Collections.Generic;

namespace IMS.IdeaPool.Process
{
    internal class SettingsProcess : ISettingsProcess
    {
        private const int FIELDOFWATER_NAME_MAX_CHARACTER_LENGTH = 50;
        private const int FIELDOFWATER_DESCRIPTION_MAX_CHARACTER_LENGTH = 500;
        private const int IDEASTATUS_NAME_MAX_CHARACTER_LENGTH = 50;
        private const int IDEASTATUS_DESCRIPTION_MAX_CHARACTER_LENGTH = 250;

        private ISettingsData settingsData;
        private IFieldofwaterData fieldOfWater;
        private IIdeaStatusData ideaStatusData;

        public SettingsProcess(ISettingsData settingsData, 
            IFieldofwaterData fieldOfWater,
            IIdeaStatusData ideaStatusData)
        {
            this.settingsData = settingsData;
            this.fieldOfWater = fieldOfWater;
            this.ideaStatusData = ideaStatusData;
        }

        public List<SettingsGroupDataObject> GetGroupSettings()
        {
            return settingsData.GetGroupSettings();
        }

        public List<FieldOfWaterDataObject> GetAllFieldOfWater()
        {
            return fieldOfWater.GetAll();
        }

        public List<string> UpdateSettings(SettingsGroupDataObject group)
        {
            return settingsData.Update(group);
        }

        public void AddFieldOfWater(FieldOfWaterDataObject fieldOfWater)
        {
            List<int> errorcodes = new List<int>();
            if (string.IsNullOrEmpty(fieldOfWater.Name) || string.IsNullOrEmpty(fieldOfWater.Description))
            {
                errorcodes.Add(134);
                throw new BusinessException(errorcodes);
            }
            if (fieldOfWater.Name.Length > FIELDOFWATER_NAME_MAX_CHARACTER_LENGTH 
                || fieldOfWater.Description.Length > FIELDOFWATER_DESCRIPTION_MAX_CHARACTER_LENGTH)
            {
                errorcodes.Add(120);
                throw new BusinessException(errorcodes);
            }
            this.fieldOfWater.Insert(fieldOfWater);
        }

        public void ActivateFieldOfWater(int fieldOfWaterId)
        {
            if (fieldOfWaterId == 0)
            {
                throw new CustomException("Invalid Parameters.");
            }
            fieldOfWater.Activate(fieldOfWaterId);
        }

        public void DeactivateFieldOfWater(int fieldOfWaterId)
        {
            if (fieldOfWaterId == 0)
            {
                throw new CustomException("Invalid Parameters.");
            }
            fieldOfWater.Deactivate(fieldOfWaterId);
        }

        public void AddIdeaStatus(IdeaStatusDataObject ideaStatus)
        {
            List<int> errorcodes = new List<int>();
            if (string.IsNullOrEmpty(ideaStatus.Name) || string.IsNullOrEmpty(ideaStatus.Description))
            {
                errorcodes.Add(134);
                throw new BusinessException(errorcodes);
            }
            if (ideaStatus.Name.Length > IDEASTATUS_NAME_MAX_CHARACTER_LENGTH
                || ideaStatus.Description.Length > IDEASTATUS_DESCRIPTION_MAX_CHARACTER_LENGTH)
            {
                errorcodes.Add(120);
                throw new BusinessException(errorcodes);
            }
            ideaStatusData.Insert(ideaStatus);
        }

        public void ActivateIdeaStatus(int statusId)
        {
            if (statusId == 0)
            {
                throw new CustomException("Invalid Parameters.");
            }
            ideaStatusData.Activate(statusId);
        }

        public void DeactivateIdeaStatus(int statusId)
        {
            if (statusId == 0)
            {
                throw new CustomException("Invalid Parameters.");
            }
            ideaStatusData.Deactivate(statusId);
        }
    }
}
