using IMS.IdeaPool.DataObjects;

namespace IMS.IdeaPool.Process.Interfaces
{
    public interface IFileProcess
    {
        int Insert(FileDataObject file, int ideaId, int userId);
        FileDataObject Fetch(int ideaId, int fileId);
        FileDataObject FetchThumbnail(int fileId, int ideaId);
        byte[] GetThumbnail(FileDataObject file);
    }
}