using IMS.IdeaPool.Process.Exceptions;
using IMS.IdeaPool.Web.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace IMS.IdeaPool.Web.ActionFilters
{
    [AttributeUsage(AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
    public class HasAccessAttribute : FilterAttribute, IAuthorizationFilter
    {
        private FeatureAccess _access;
        public HasAccessAttribute(FeatureAccess access)
        {
            _access = access;
        }

        public void OnAuthorization(AuthorizationContext filterContext)
        {
            if (!HasAccess(filterContext))
            {
                throw new PermissionException();
            }
        }

        private bool HasAccess(AuthorizationContext filtercontext)
        {
            bool hasaccess = false;
            if (filtercontext.HttpContext.User.Identity.IsAuthenticated)
            {
                var featureAccess = filtercontext.HttpContext.Session[SessionKeys.FEATURE_ACCESS];
                if (featureAccess != null)
                {
                    List<string> features = featureAccess as List<string>;
                    List<string> requiredAccess = GetRequiredAccessFeatureKeys();
                    if (features.Find(x => requiredAccess.Contains(x)) != null)
                    {
                        hasaccess = true;
                    }
                }
            }
            return hasaccess;
        }

        private List<string> GetRequiredAccessFeatureKeys()
        {
            return _access.ToString().Split(',').Select(x => x.Trim()).ToList();
        }
    }
}