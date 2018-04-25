using System.Web.Optimization;

namespace IMS.IdeaPool.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Scripts/dist/libraries/bootstrap/css/bootstrap.css"
                      , "~/Scripts/dist/libraries/summernote/summernote.css"
                      , "~/Scripts/dist/libraries/react-notifications/react-notifications.css"
                      , "~/Content/site.css"
                      , "~/Content/Chat.css"
                      , "~/Scripts/dist/libraries/jquery-colorbox/colorbox.css"
                      , "~/Scripts/dist/libraries/jquery-ui/jquery-ui.min.css"
                      , "~/Scripts/dist/libraries/jquery-ui/jquery-ui.structure.css"
                      , "~/Scripts/dist/libraries/jquery-ui/jquery-ui.theme.css"
                      , "~/Scripts/dist/libraries/p-loading/p-loading.min.css"
                      , "~/Scripts/dist/libraries/spectrum-colorpicker/spectrum.css"
                      ));
        }
    }
}
