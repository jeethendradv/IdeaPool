using System.Web.Mvc;
using System.Web.Routing;

namespace IMS.IdeaPool.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "CreateNewIdea",
                url: "Idea/New",
                defaults: new { controller = "Home", action = "Index" }
            );

            routes.MapRoute(
                name: "ViewIdea",
                url: "Idea/View/{id}",
                defaults: new { controller = "Home", action = "Index" }
            );

            routes.MapRoute(
                name: "EditIdea",
                url: "Idea/Edit/{id}",
                defaults: new { controller = "Home", action = "Index" }
            );

            routes.MapRoute(
                name: "SettingsIndex",
                url: "Settings/Index",
                defaults: new { controller = "Home", action = "Index" }
            );

            routes.MapRoute(
                name: "UsersIndex",
                url: "Users/Index",
                defaults: new { controller = "Home", action = "Index" }
            );

            routes.MapRoute(
                name: "Userpasswordreset",
                url: "User/ResetPassword",
                defaults: new { controller = "Home", action = "Index" }
            );

            routes.MapRoute(
                name: "Resetpassword",
                url: "Resetpassword",
                defaults: new { controller = "Login", action = "Index" }
            );

            routes.MapRoute(
                name: "Activate",
                url: "Activate",
                defaults: new { controller = "Login", action = "Index" }
            );

            routes.MapRoute(
                name: "forgotpassword",
                url: "forgotpassword",
                defaults: new { controller = "Login", action = "Index" }
            );

            routes.MapRoute(
                name: "register",
                url: "register",
                defaults: new { controller = "Login", action = "Index" }
            );

            routes.MapRoute(
                name: "login",
                url: "Login/Index/{id}",
                defaults: new { controller = "Login", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Login", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
