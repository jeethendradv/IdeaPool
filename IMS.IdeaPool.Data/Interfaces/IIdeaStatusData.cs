using IMS.IdeaPool.DataObjects;

namespace IMS.IdeaPool.Data.Interfaces
{
    public interface IIdeaStatusData
    {
        void Insert(IdeaStatusDataObject status);
        void Activate(int id);
        void Deactivate(int id);
    }
}
