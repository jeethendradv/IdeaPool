using IMS.IdeaPool.DataObjects;
using System.Collections.Generic;

namespace IMS.IdeaPool.Process.Interfaces
{
    public interface ISettingsProcess
    {
        List<SettingsGroupDataObject> GetGroupSettings();
        List<FieldOfWaterDataObject> GetAllFieldOfWater();
        List<string> UpdateSettings(SettingsGroupDataObject group);
        void AddFieldOfWater(FieldOfWaterDataObject fieldOfWater);
        void ActivateFieldOfWater(int fieldOfWaterId);
        void DeactivateFieldOfWater(int fieldOfWaterId);
        void AddIdeaStatus(IdeaStatusDataObject ideaStatus);
        void ActivateIdeaStatus(int statusId);
        void DeactivateIdeaStatus(int statusId);
    }
}
