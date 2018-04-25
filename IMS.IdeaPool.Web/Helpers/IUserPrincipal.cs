using System.Collections.Generic;
using System.Security.Principal;

namespace IMS.IdeaPool.Web.Helpers
{
    interface IUserPrincipal : IPrincipal
    {
        int Id { get; set; }
        string FirstName { get; set; }
        string LastName { get; set; }
    }
}
