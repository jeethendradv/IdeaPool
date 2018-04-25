using IMS.IdeaPool.DataObjects;

namespace IMS.IdeaPool.Data.Interfaces
{
    public interface IAuditData
    {
        void Insert(AuditDataObject audit);
    }
}
