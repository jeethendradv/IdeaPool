using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.Data.Keys;
using IMS.IdeaPool.DataObjects;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace IMS.IdeaPool.Data
{
    internal class UserData : IUserData
    {
        public UserDataObject Get(string email)
        {
            UserDataObject user = null;
            User userobj = null;
            using (var context = new IdeaPoolEntities())
            {
                userobj = context.Users
                    .Where(u => u.Email == email)
                    .Include(u => u.Login)
                    .Include(u => u.Roles)
                    .Include(u => u.Roles.Select(x => x.Features))
                    .SingleOrDefault();
            }
            user = MapUser(userobj);
            return user;
        }

        public UserDataObject Get(int userid)
        {
            UserDataObject user = null;
            User userobj = null;
            using (var context = new IdeaPoolEntities())
            {
                userobj = context.Users
                   .Where(u => u.Id == userid)
                   .Include(u => u.Login)
                   .Include(u => u.Roles)
                   .Include(u => u.Roles.Select(x => x.Features))
                   .SingleOrDefault();
            }
            user = MapUser(userobj);
            return user;
        }

        public int Add(UserDataObject userDataObject)
        {
            int userId = 0;
            using (var context = new IdeaPoolEntities())
            {
                User user = new User
                {
                    FirstName = userDataObject.FirstName,
                    LastName = userDataObject.LastName,
                    Company = userDataObject.Company,
                    Email = userDataObject.Email,
                    Phone = userDataObject.Phone,
                    CreateDate = DateTime.UtcNow,
                    IsSubscriptionEnabled = userDataObject.IsSubscriptionEnabled,
                    IsActive = true
                };
                Role submitterRole = context.Roles.Single(x => x.Key == RoleKeys.SUBMITTER);

                // Add submitter role
                user.Roles.Add(submitterRole);
                context.Users.Add(user);
                context.SaveChanges();

                Login login = new Login
                {
                    UserId = user.Id,
                    Password = userDataObject.EncryptedPassword,
                    IsActivated = false
                };
                context.Logins.Add(login);
                context.SaveChanges();
                userId = user.Id;
            }
            return userId;
        }

        public void Update(UserDataObject user)
        {
            using (var context = new IdeaPoolEntities())
            {
                User entity = context.Users.Where(x => x.Id == user.Id).Single();
                entity.FirstName = user.FirstName;
                entity.LastName = user.LastName;
                entity.Company = user.Company;
                entity.Phone = user.Phone;
                entity.IsSubscriptionEnabled = user.IsSubscriptionEnabled;
                context.Entry(entity).State = EntityState.Modified;
                context.SaveChanges();
            }
        }

        public string GetEmailAddress(string email)
        {
            using (var context = new IdeaPoolEntities())
            {
                return context.Users.Where(user => user.Email == email).Select(x => x.Email).SingleOrDefault();
            }
        }

        public string GetEmailAddress(int userId)
        {
            using (var context = new IdeaPoolEntities())
            {
                return context.Users.Where(user => user.Id == userId).Select(x => x.Email).SingleOrDefault();
            }
        }

        public List<string> GetOwnerEmailAddresses()
        {
            List<string> emailAddresses = null;
            using (var context = new IdeaPoolEntities())
            {
                emailAddresses = context.Roles.Where(role => role.Key == RoleKeys.OWNER || role.Key == RoleKeys.REVIEWER)
                    .SelectMany(x => x.Users)
                    .Select(x => x.Email)
                    .ToList();
            }
            return emailAddresses;
        }

        public List<int> GetOwnerUserIds()
        {
            List<int> userIds = null;
            using (var context = new IdeaPoolEntities())
            {
                userIds = context.Roles.Where(role => role.Key == RoleKeys.OWNER || role.Key == RoleKeys.REVIEWER)
                    .SelectMany(x => x.Users)
                    .Select(x => x.Id)
                    .ToList();
            }
            return userIds;
        }

        public bool Activate(string email)
        {
            bool isActivated = false;
            using (var context = new IdeaPoolEntities())
            {
                Login login = context.Users.Where(user => user.Email == email).Select(u => u.Login).SingleOrDefault();
                if (login != null)
                {
                    login.IsActivated = true;
                    isActivated = true;
                    context.Entry(login).State = EntityState.Modified;
                    context.SaveChanges();
                }
            }
            return isActivated;
        }

        public void UpdateLoginDateTime(int userId)
        {
            using (var context = new IdeaPoolEntities())
            {
                Login login = context.Logins.SingleOrDefault(l => l.UserId == userId);
                if (login != null)
                {
                    login.LastLogin = DateTime.UtcNow;
                    context.Entry(login).State = EntityState.Modified;
                    context.SaveChanges();
                }
            }
        }

        public List<UserNameObject> Search(string name)
        {
            using (var context = new IdeaPoolEntities())
            {
                return context.Users
                    .Where(x => x.FirstName.Contains(name) || x.LastName.Contains(name))
                    .Select(user => new UserNameObject
                    {
                        Id = user.Id,
                        FirstName = user.FirstName,
                        LastName = user.LastName
                    }).ToList();
            }
        }

        public UserSearchResults Search(UserSearchSettings searchsettings)
        {
            UserSearchResults results = new UserSearchResults();
            using (var context = new IdeaPoolEntities())
            {
                var query = context.Users.AsQueryable();
                if (!string.IsNullOrEmpty(searchsettings.SearchTerm))
                {
                    query = query.Where(user => user.FirstName.Contains(searchsettings.SearchTerm) ||
                    user.LastName.Contains(searchsettings.SearchTerm));
                }
                results.TotalCount = query.Count();

                results.Results = query
                    .OrderBy(user => user.FirstName)
                    .Skip((searchsettings.CurrentPage - 1) * searchsettings.PageLength)
                    .Take(searchsettings.PageLength)
                    .Select(user => new UserBase
                    {
                        Id = user.Id,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Company = user.Company,
                        JoinedDate = user.CreateDate,
                        TotalIdeasSubmitted = user.Ideas.Count
                    })
                    .ToList();
            }
            return results;
        }

        public List<KeyValueDataObject> FetchAllRoles()
        {
            using (var context = new IdeaPoolEntities())
            {
                return context.Roles.Select(role => new KeyValueDataObject
                {
                    Key = role.Key,
                    Value = role.Name
                }).ToList();
            }
        }

        public bool UpdateAccountStatus(int userid, bool status)
        {
            bool saved = false;
            using (var context = new IdeaPoolEntities())
            {
                User usr = context.Users.Where(user => user.Id == userid).SingleOrDefault();
                if (usr != null)
                {
                    usr.IsActive = status;
                    context.Entry(usr).State = EntityState.Modified;
                    context.SaveChanges();
                    saved = true;
                }
            }
            return saved;
        }

        public bool UpdateLoginStatus(int userId, bool status)
        {
            bool saved = false;
            using (var context = new IdeaPoolEntities())
            {
                Login login = context.Logins.Where(x => x.UserId == userId).SingleOrDefault();
                if (login != null)
                {
                    login.IsActivated = status;
                    context.Entry(login).State = EntityState.Modified;
                    context.SaveChanges();
                    saved = true;
                }
            }
            return saved;
        }

        public List<KeyValueDataObject> AddRole(int userId, string key)
        {
            List<KeyValueDataObject> roles = new List<KeyValueDataObject>();
            using (var context = new IdeaPoolEntities())
            {
                User user = context.Users
                    .Include(x => x.Roles)
                    .Where(x => x.Id == userId)
                    .SingleOrDefault();
                if (user != null)
                {
                    Role role = context.Roles.Where(x => x.Key == key).SingleOrDefault();
                    if (role != null)
                    {
                        user.Roles.Add(role);
                        context.SaveChanges();
                    }
                    roles = GetRoles(user);
                }
            }
            return roles;
        }

        public List<KeyValueDataObject> RemoveRole(int userId, string key)
        {
            List<KeyValueDataObject> roles = new List<KeyValueDataObject>();
            using (var context = new IdeaPoolEntities())
            {
                User user = context.Users
                    .Include(x => x.Roles)
                    .Where(x => x.Id == userId)
                    .SingleOrDefault();
                if (user != null)
                {
                    Role role = context.Roles.Where(x => x.Key == key).SingleOrDefault();
                    if (role != null)
                    {
                        user.Roles.Remove(role);
                        context.SaveChanges();
                    }
                    roles = GetRoles(user);
                }
            }
            return roles;
        }

        public bool IsOwnerOrReviewer(int userId)
        {
            using (var context = new IdeaPoolEntities())
            {
                return context.Users
                    .Where(user => user.Id == userId && user.Roles.Any(role => role.Key == RoleKeys.OWNER || role.Key == RoleKeys.REVIEWER))
                    .Any();
            }
        }

        private UserDataObject MapUser(User userobj)
        {
            UserDataObject user = null;
            if (userobj != null)
            {
                user = new UserDataObject
                {
                    FirstName = userobj.FirstName,
                    LastName = userobj.LastName,
                    EncryptedPassword = userobj.Login.Password,
                    IsAccountActivated = userobj.Login.IsActivated,
                    Email = userobj.Email,
                    Id = userobj.Id,
                    Company = userobj.Company,
                    Phone = userobj.Phone,
                    IsSubscriptionEnabled = userobj.IsSubscriptionEnabled,
                    IsActive = userobj.IsActive,
                    FeatureAccess = GetFeatureKeys(userobj),
                    Roles = GetRoles(userobj),
                    IsOwnerOrReviewer = userobj.Roles.Any(role => role.Key == RoleKeys.OWNER || role.Key == RoleKeys.REVIEWER)
                };
            }
            return user;
        }

        private List<string> GetFeatureKeys(User userobj)
        {
            List<string> features = new List<string>();
            foreach (var role in userobj.Roles)
            {
                features.AddRange(role.Features.Select(x => x.Key));
            }
            return features;
        }

        private List<KeyValueDataObject> GetRoles(User userobj)
        {
            List<KeyValueDataObject> roles = new List<KeyValueDataObject>();
            foreach (var role in userobj.Roles)
            {
                roles.Add(new KeyValueDataObject
                {
                    Key = role.Key,
                    Value = role.Name
                });
            }
            return roles;
        }
    }
}
