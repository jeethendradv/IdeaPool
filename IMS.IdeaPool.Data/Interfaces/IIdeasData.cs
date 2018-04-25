using IMS.IdeaPool.DataObjects;
using System.Collections.Generic;

namespace IMS.IdeaPool.Data.Interfaces
{
    public interface IIdeasData
    {
        int Insert(IdeaDataObject idea);
        int Update(IdeaDataObject idea);        
        IdeaSearchResults GetAll(IdeaSearchSettings searchsettings, int currentUserId);
        IdeaDataObject Fetch(int ideaId, FetchMode mode);
        int GetCreatorUserId(int ideaId);
        List<IdeaStatusDataObject> FetchAllActiveIdeaStatus();
        List<IdeaStatusDataObject> FetchAllIdeaStatus();
        bool UpdateStatus(int ideaId, int statusId, int userId);
        string FetchStatusKey(int ideaId);
        void MarkRead(int ideaId, int userId);
        string GetCreatorEmailAddress(int ideaId);
        bool IsInDraftMode(int ideaId);
        bool TitleExists(int ideaId, string ideaName);
        bool DescriptionExists(int ideaId, string description);
    }
}