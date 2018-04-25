using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process;
using IMS.IdeaPool.Web.ActionFilters;
using IMS.IdeaPool.Web.Helpers;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace IMS.IdeaPool.Web.Controllers
{
    [Authenticate]
    public class SettingsController : BaseController
    {
        [HasAccess(FeatureAccess.SETTINGS_EDIT)]
        public JsonResult Get()
        {
            List<SettingsGroupDataObject> settings = ProcessFactory.GetSettingsProcess().GetGroupSettings();
            return Json(settings, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [HasAccess(FeatureAccess.SETTINGS_EDIT)]
        public JsonResult FetchAllFieldOfWaters()
        {
            List<FieldOfWaterDataObject> fieldOfWaters = ProcessFactory.GetSettingsProcess().GetAllFieldOfWater();
            return Json(fieldOfWaters);
        }

        [HttpPost]
        [HasAccess(FeatureAccess.SETTINGS_EDIT)]
        public JsonResult FetchAllIdeaStatuses()
        {
            List<IdeaStatusDataObject> statuses = ProcessFactory.GetIdeaProcess().FetchAllIdeaStatus();
            return Json(statuses);
        }

        [HttpPost]
        [HasAccess(FeatureAccess.SETTINGS_EDIT)]
        public void UpdateSettings(SettingsGroupDataObject group)
        {
            List<string> updatedSettingsKeys = ProcessFactory.GetSettingsProcess().UpdateSettings(group);
            foreach(string key in updatedSettingsKeys)
            {
                string value = group.Settings.Single(x => x.Key == key).Value;
                string auditDescription = string.Format("Updated setting (key = {0}) value to {1}", key, value);
                Audit(AuditType.SETTINGS_EDIT, auditDescription);
            }
        }

        [HttpPost]
        [HasAccess(FeatureAccess.SETTINGS_EDIT)]
        public void AddFieldOfWater(FieldOfWaterDataObject fieldOfWater)
        {
            fieldOfWater.CreatedByUserId = UserId;
            ProcessFactory.GetSettingsProcess().AddFieldOfWater(fieldOfWater);
        }

        [HttpPost]
        [HasAccess(FeatureAccess.SETTINGS_EDIT)]
        public void ActivateFieldOfWater(int fieldOfWaterId)
        {
            ProcessFactory.GetSettingsProcess().ActivateFieldOfWater(fieldOfWaterId);
            Audit(AuditType.FIELDOFWATER_ACTIVATED, fieldOfWaterId.ToString());
        }

        [HttpPost]
        [HasAccess(FeatureAccess.SETTINGS_EDIT)]
        public void DeactivateFieldOfWater(int fieldOfWaterId)
        {
            ProcessFactory.GetSettingsProcess().DeactivateFieldOfWater(fieldOfWaterId);
            Audit(AuditType.FIELDOFWATER_DEACTIVATED, fieldOfWaterId.ToString());
        }

        [HttpPost]
        [HasAccess(FeatureAccess.SETTINGS_EDIT)]
        public void AddIdeaStatus(IdeaStatusDataObject ideaStatus)
        {
            ideaStatus.CreatedByUserId = UserId;
            ProcessFactory.GetSettingsProcess().AddIdeaStatus(ideaStatus);
        }

        [HttpPost]
        [HasAccess(FeatureAccess.SETTINGS_EDIT)]
        public void ActivateIdeaStatus(int statusId)
        {
            ProcessFactory.GetSettingsProcess().ActivateIdeaStatus(statusId);
            Audit(AuditType.IDEASTATUS_ACTIVATED, statusId.ToString());
        }

        [HttpPost]
        [HasAccess(FeatureAccess.SETTINGS_EDIT)]
        public void DeactivateIdeaStatus(int statusId)
        {
            ProcessFactory.GetSettingsProcess().DeactivateIdeaStatus(statusId);
            Audit(AuditType.IDEASTATUS_DEACTIVATED, statusId.ToString());
        }

        private void Audit(AuditType type, string description)
        {
            AuditDataObject audit = new AuditDataObject
            {
                AuditTypeKey = type.ToString(),
                Description = description,
                LoginUserId = UserId
            };
            ProcessFactory.GetAuditProcess().Insert(audit);
        }
    }
}