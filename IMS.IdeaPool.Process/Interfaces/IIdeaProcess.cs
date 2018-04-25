using IMS.IdeaPool.DataObjects;
using System.Collections.Generic;

namespace IMS.IdeaPool.Process.Interfaces
{
    public interface IIdeaProcess
    {
        List<KeyValuePair<int, string>> GetFieldOfWater();
        int Save(IdeaDataObject idea);
        int Update(IdeaDataObject idea);
        IdeaSearchResults GetAll(IdeaSearchSettings searchsettings, int currentUserId);
        List<SettingsDataObject> GetSettings();
        IdeaDataObject Fetch(int ideaId, FetchMode mode);
        int GetCreatorUserId(int ideaId);
        List<IdeaStatusDataObject> FetchAllActiveIdeaStatus();
        List<IdeaStatusDataObject> FetchAllIdeaStatus();
        void UpdateStatus(int ideaId, int statusId, int userId);
        void MarkRead(int ideaId, int userId);
        string GetCreatorEmailAddress(int ideaId);
        string FetchStatusKey(int ideaId);
        bool IsInDraftMode(int ideaId);
        bool TitleExists(int ideaId, string ideaName);
        bool DescriptionExists(int ideaId, string description);
    }
}
