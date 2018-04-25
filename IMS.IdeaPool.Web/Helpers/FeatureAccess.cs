using System;

namespace IMS.IdeaPool.Web.Helpers
{
    [Flags]
    public enum FeatureAccess
    {
        SUBMIT_IDEA = 1,
        VIEW_IDEAS_OF_OTHERS = 2,
        VIEW_IDEAS = 3,
        UPDATE_IDEA_STATUS = 4,
        USER_SEARCH = 5,
        USER_EDIT = 6,
        SETTINGS_EDIT = 7,
        EXPORT_IDEAS = 8,
        PRINT_IDEA = 9
    }
}