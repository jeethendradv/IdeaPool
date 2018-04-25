using IMS.IdeaPool.Web.SignalR;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Startup))]
namespace IMS.IdeaPool.Web.SignalR
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            IdeaPoolUserIdProvider idprovider = new IdeaPoolUserIdProvider();
            GlobalHost.DependencyResolver.Register(typeof(IUserIdProvider), () => idprovider);
            app.MapSignalR();            
        }
    }
}
