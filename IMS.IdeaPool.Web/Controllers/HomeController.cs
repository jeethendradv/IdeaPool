using IMS.IdeaPool.Web.ActionFilters;
using System.Web.Mvc;

namespace IMS.IdeaPool.Web.Controllers
{
    [Authenticate]
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}