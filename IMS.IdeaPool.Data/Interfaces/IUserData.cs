using IMS.IdeaPool.DataObjects;
using System.Collections.Generic;

namespace IMS.IdeaPool.Data.Interfaces
{
    public interface IUserData
    {
        UserDataObject Get(string email);
        UserDataObject Get(int userid);
        void Update(UserDataObject user);
        int Add(UserDataObject userDataObject);
        string GetEmailAddress(string email);
        string GetEmailAddress(int userId);
        bool Activate(string email);
        void UpdateLoginDateTime(int userId);
        List<string> GetOwnerEmailAddresses();
        List<UserNameObject> Search(string name);
        UserSearchResults Search(UserSearchSettings searchsettings);
        List<KeyValueDataObject> FetchAllRoles();
        bool UpdateAccountStatus(int userid, bool status);
        bool UpdateLoginStatus(int userId, bool status);
        List<KeyValueDataObject> AddRole(int userId, string key);
        List<KeyValueDataObject> RemoveRole(int userId, string key);
        bool IsOwnerOrReviewer(int userId);
        List<int> GetOwnerUserIds();
    }
}
