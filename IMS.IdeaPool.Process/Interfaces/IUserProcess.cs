using IMS.IdeaPool.DataObjects;
using System.Collections.Generic;

namespace IMS.IdeaPool.Process.Interfaces
{
    public interface IUserProcess
    {
        UserDataObject GetUser(int userId);
        void Update(UserDataObject user);
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
