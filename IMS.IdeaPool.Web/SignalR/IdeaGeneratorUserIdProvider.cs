using IMS.IdeaPool.Web.Helpers;
using Microsoft.AspNet.SignalR;

namespace IMS.IdeaPool.Web.SignalR
{
    public class IdeaPoolUserIdProvider : IUserIdProvider
    {
        public string GetUserId(IRequest request)
        {
            UserPrincipal user = request.User as UserPrincipal;
            return user.Id.ToString();
        }
    }
}