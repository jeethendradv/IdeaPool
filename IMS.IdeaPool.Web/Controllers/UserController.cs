using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process;
using IMS.IdeaPool.Process.Exceptions;
using IMS.IdeaPool.Web.ActionFilters;
using IMS.IdeaPool.Web.ActionFilters.Audit;
using IMS.IdeaPool.Web.Helpers;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace IMS.IdeaPool.Web.Controllers
{
    [Authenticate]
    public class UserController : BaseController
    {
        [AllowAnonymous]
        public JsonResult GetUser()
        {
            UserDataObject user = ProcessFactory.GetUserProcess().GetUser(UserId);
            if (user == null)
            {
                user = new UserDataObject();
            }
            return Json(
                new
                {
                    user.FirstName,
                    user.LastName,
                    user.Email,
                    user.Phone,
                    user.Company,
                    user.IsSubscriptionEnabled,
                    user.FeatureAccess,
                    user.Id
                }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [UserAudit(AuditType.USER_PROFILE_UPDATE)]
        public void Update(UserDataObject user)
        {
            if (UserId != user.Id)
            {
                throw new PermissionException();
            }
            ProcessFactory.GetUserProcess().Update(user);
        }

        [HttpPost]
        [HasAccess(FeatureAccess.USER_SEARCH)]
        public JsonResult Autocomplete(string term)
        {
            List<UserNameObject> users = ProcessFactory.GetUserProcess().Search(term);
            return Json(users);
        }

        [HttpPost]
        [HasAccess(FeatureAccess.USER_SEARCH)]
        [UserAudit(AuditType.VIEW_USER_DETAILS, "userid")]
        public JsonResult FetchUserInfo(int userid)
        {
            UserDataObject user = ProcessFactory.GetUserProcess().GetUser(userid);
            if (user == null)
            {
                user = new UserDataObject();
            }
            return Json(
                new
                {
                    user.FirstName,
                    user.LastName,
                    user.Email,
                    user.Phone,
                    user.Company,
                    user.FeatureAccess,
                    user.Id,
                    user.IsSubscriptionEnabled,
                    user.IsActive,
                    user.IsAccountActivated,
                    user.Roles
                });
        }

        [HttpPost]
        public JsonResult FetchUserDetails(int userid)
        {
            UserDataObject user = new UserDataObject();
            if (IsOwnerOrReviewer || userid == UserId || ProcessFactory.GetUserProcess().IsOwnerOrReviewer(userid))
            {
                user = ProcessFactory.GetUserProcess().GetUser(userid);
                if (user == null)
                {
                    user = new UserDataObject();
                }
            }
            return Json(
                new
                {
                    user.FirstName,
                    user.LastName,
                    user.Email,
                    user.Phone,
                    user.Company
                });
        }

        [HttpPost]
        [HasAccess(FeatureAccess.USER_SEARCH)]
        public JsonResult FetchAllRoles()
        {
            List<KeyValueDataObject> roles = ProcessFactory.GetUserProcess().FetchAllRoles();
            return Json(roles);
        }

        [HttpPost]
        [HasAccess(FeatureAccess.USER_EDIT)]
        [UserAudit(AuditType.USER_ACTIVATED, "userId")]
        public bool Activate(int userId)
        {
            return ProcessFactory.GetUserProcess().UpdateAccountStatus(userId, true);
        }

        [HttpPost]
        [HasAccess(FeatureAccess.USER_EDIT)]
        [UserAudit(AuditType.USER_DEACTIVATED, "userId")]
        public bool Deactivate(int userId)
        {
            return ProcessFactory.GetUserProcess().UpdateAccountStatus(userId, false);
        }

        [HttpPost]
        [HasAccess(FeatureAccess.USER_EDIT)]
        [UserAudit(AuditType.USER_LOGIN_ACTIVE, "userId")]
        public bool ActivateLogin(int userId)
        {
            return ProcessFactory.GetUserProcess().UpdateLoginStatus(userId, true);
        }

        [HttpPost]
        [HasAccess(FeatureAccess.USER_EDIT)]
        [UserAudit(AuditType.USER_LOGIN_DEACTIVE, "userId")]
        public bool DeactivateLogin(int userId)
        {
            return ProcessFactory.GetUserProcess().UpdateLoginStatus(userId, false);
        }

        [HttpPost]
        [HasAccess(FeatureAccess.USER_EDIT)]
        [UserAudit(AuditType.ADD_USER_ROLE, "userId")]
        public JsonResult AddRole(int userId, string key)
        {
            List<KeyValueDataObject> roles = ProcessFactory.GetUserProcess().AddRole(userId, key);
            return Json(roles);
        }

        [HttpPost]
        [HasAccess(FeatureAccess.USER_EDIT)]
        [UserAudit(AuditType.REMOVE_USER_ROLE, "userId")]
        public JsonResult RemoveRole(int userId, string key)
        {
            List<KeyValueDataObject> roles = ProcessFactory.GetUserProcess().RemoveRole(userId, key);
            return Json(roles);
        }

        [HttpPost]
        [HasAccess(FeatureAccess.USER_SEARCH)]
        public JsonResult Search(UserSearchSettings searchSetting)
        {
            UserSearchResults users = ProcessFactory.GetUserProcess().Search(searchSetting);
            SearchResults results = new SearchResults(users.TotalCount, searchSetting.PageLength)
            {
                Rows = users.Results.Select(user => new
                {
                    user.Id,
                    user.FullName,
                    JoinedDate = user.JoinedDate.ToShortDateString(),
                    user.Company,
                    user.TotalIdeasSubmitted
                }).ToList<object>(),
                CurrentPage = searchSetting.CurrentPage
            };
            return Json(results);
        }
    }
}