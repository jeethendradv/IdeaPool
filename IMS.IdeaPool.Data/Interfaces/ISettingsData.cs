using IMS.IdeaPool.DataObjects;
using System.Collections.Generic;

namespace IMS.IdeaPool.Data.Interfaces
{
    public interface ISettingsData
    {
        List<SettingsGroupDataObject> GetGroupSettings();
        SettingsGroupDataObject GetGroupSettings(string key);
        T GetValue<T>(string key);
        List<string> Update(SettingsGroupDataObject group);
    }
}
