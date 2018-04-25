using IMS.IdeaPool.DataObjects;
using System.Collections.Generic;

namespace IMS.IdeaPool.Data.Interfaces
{
    public interface IFileData
    {
        FileDataObject Fetch(int ideaId, int fileId);
        int Insert(FileDataObject file, int ideaId);
        void Insert(IdeaPoolEntities context, List<FileDataObject> files, int ideaId);
        void Insert(IdeaPoolEntities context, List<FileDataObject> files, Idea ideaData);
        FileDataObject FetchThumbnail(int fileId, int ideaId);
    }
}
