using IMS.IdeaPool.DataObjects;

namespace IMS.IdeaPool.Process.Interfaces
{
    public interface IAuditProcess
    {
        void Insert(AuditDataObject audit);
    }
}
