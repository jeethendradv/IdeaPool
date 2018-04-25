using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Exceptions;
using IMS.IdeaPool.Process.Interfaces;
using IMS.IdeaPool.Process.Validators;
using System.Collections.Generic;

namespace IMS.IdeaPool.Process
{
    internal class UserProcess : IUserProcess
    {
        private IUserData userData;
        public UserProcess(IUserData userData)
        {
            this.userData = userData;
        }

        public UserDataObject GetUser(int userId)
        {
            return userData.Get(userId);
        }

        public void Update(UserDataObject user)
        {
            if (user.Id < 1)
            {
                throw new CustomException("Invalid user.");
            }
            ProfileValidator validator = new ProfileValidator();
            if (!validator.IsValid(user))
            {
                throw new FormException(validator.ErrorCodes);
            }
            userData.Update(user);
        }

        public List<string> GetOwnerEmailAddresses()
        {
            return userData.GetOwnerEmailAddresses();
        }

        public List<UserNameObject> Search(string name)
        {
            return userData.Search(name);
        }

        public List<KeyValueDataObject> FetchAllRoles()
        {
            return userData.FetchAllRoles();
        }

        public bool UpdateAccountStatus(int userid, bool status)
        {
            if (userid < 1)
            {
                throw new CustomException("Invalid user.");
            }
            return userData.UpdateAccountStatus(userid, status);
        }

        public bool UpdateLoginStatus(int userId, bool status)
        {
            if (userId < 1)
            {
                throw new CustomException("Invalid user.");
            }
            return userData.UpdateLoginStatus(userId, status);
        }

        public List<KeyValueDataObject> AddRole(int userId, string key)
        {
            if (userId < 1 || string.IsNullOrEmpty(key))
            {
                throw new CustomException("Invalid user or role.");
            }
            return userData.AddRole(userId, key);
        }

        public List<KeyValueDataObject> RemoveRole(int userId, string key)
        {
            if (userId < 1 || string.IsNullOrEmpty(key))
            {
                throw new CustomException("Invalid user or role.");
            }
            return userData.RemoveRole(userId, key);
        }

        public UserSearchResults Search(UserSearchSettings searchsettings)
        {
            return userData.Search(searchsettings);
        }

        public bool IsOwnerOrReviewer(int userId)
        {
            return userData.IsOwnerOrReviewer(userId);
        }

        public List<int> GetOwnerUserIds()
        {
            return userData.GetOwnerUserIds();
        }
    }
}
