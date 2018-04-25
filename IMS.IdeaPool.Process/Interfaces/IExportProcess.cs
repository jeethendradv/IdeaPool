using IMS.IdeaPool.DataObjects;

namespace IMS.IdeaPool.Process.Interfaces
{
    public interface IExportProcess
    {
        ExportResult Export(ExportCriteria criteria, int loggedInUserId);
    }
}
