using IMS.IdeaPool.Web.ActionFilters.Audit;
using IMS.IdeaPool.Web.Helpers;
using System.Web.Mvc;
using System.Web.Security;

namespace IMS.IdeaPool.Web.Controllers
{
    public class LogoutController : Controller
    {
        [UserAudit(AuditType.USER_LOGOUT)]
        public ActionResult Index()
        {
            FormsAuthentication.SignOut();
            return RedirectToRoute("login");
        }
    }
}