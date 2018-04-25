using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using System;
using System.Linq;

namespace IMS.IdeaPool.Data
{
    internal class AuditData : IAuditData
    {
        public void Insert(AuditDataObject audit)
        {
            using (var context = new IdeaPoolEntities())
            {
                AuditType type = context.AuditTypes.Where(x => x.Key == audit.AuditTypeKey).Single();
                context.Audits.Add(new Audit
                {
                    AuditType = type,
                    CreateDate = DateTime.UtcNow,
                    Description = audit.Description,
                    IdeaId = audit.IdeaId,
                    LoginUserId = audit.LoginUserId,
                    UpdateUserId = audit.UpdateUserId
                });
                context.SaveChanges();
            }
        }
    }
}
