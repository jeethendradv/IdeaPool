using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Interfaces;

namespace IMS.IdeaPool.Process
{
    internal class AuditProcess : IAuditProcess
    {
        private IAuditData AuditData { get; set; }
        public AuditProcess(IAuditData auditData)
        {
            AuditData = auditData;
        }

        public void Insert(AuditDataObject audit)
        {
            AuditData.Insert(audit);
        }
    }
}
