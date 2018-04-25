using System.Security.Principal;

namespace IMS.IdeaPool.Web.Helpers
{
    public class UserPrincipal : IUserPrincipal
    {
        public UserPrincipal(string email)
        {
            Identity = new GenericIdentity(email);
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsOwnerOrReviewer { get; set; }
        public IIdentity Identity { get; private set; }
        public bool IsInRole(string role) { return false; }
    }
}