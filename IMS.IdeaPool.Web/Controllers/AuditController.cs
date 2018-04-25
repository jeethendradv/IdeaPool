using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process;
using IMS.IdeaPool.Web.ActionFilters;
using IMS.IdeaPool.Web.Helpers;

namespace IMS.IdeaPool.Web.Controllers
{
    [Authenticate]
    public class AuditController : BaseController
    {
        [HasAccess(FeatureAccess.PRINT_IDEA)]
        public void AuditPrint(int ideaId)
        {
            AuditDataObject audit = new AuditDataObject
            {
                LoginUserId = UserId,
                IdeaId = ideaId,
                AuditTypeKey = AuditType.PRINT_IDEA.ToString()
            };
            ProcessFactory.GetAuditProcess().Insert(audit);
        }
    }
}