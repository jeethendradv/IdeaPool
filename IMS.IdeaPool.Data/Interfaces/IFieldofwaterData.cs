using IMS.IdeaPool.DataObjects;
using System.Collections.Generic;

namespace IMS.IdeaPool.Data.Interfaces
{
    public interface IFieldofwaterData
    {
        List<KeyValuePair<int, string>> GetAllLabels();
        void InsertIdeaFieldOfWater(IdeaPoolEntities context, int ideaId, List<FieldOfWaterDataObject> fieldOfWaters);
        void InsertIdeaFieldOfWater(IdeaPoolEntities context, Idea ideaData, List<FieldOfWaterDataObject> fieldOfWaters);
        List<int> FetchAllIds(int ideaId);
        List<FieldOfWaterDataObject> GetAll();
        void Insert(FieldOfWaterDataObject fieldOfWater);
        void Activate(int fieldOfWaterId);
        void Deactivate(int fieldOfWaterId);
    }
}
