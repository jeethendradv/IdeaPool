using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using System.Collections.Generic;
using System.Linq;

namespace IMS.IdeaPool.Data
{
    internal class FieldOfWaterData : IFieldofwaterData
    {
        private const int FIELDOFWATER_OTHER_ID = -1;
        public void InsertIdeaFieldOfWater(IdeaPoolEntities context, int ideaId, List<FieldOfWaterDataObject> fieldOfWaters)
        {
            foreach (var fieldofwater in fieldOfWaters)
            {
                context.IdeasFieldOfWaters.Add(new IdeasFieldOfWater
                {
                    FieldOfWaterId = fieldofwater.Id,
                    Description = fieldofwater.Description,
                    IdeaId = ideaId
                });
            }
        }

        public void InsertIdeaFieldOfWater(IdeaPoolEntities context, Idea ideaData, List<FieldOfWaterDataObject> fieldOfWaters)
        {
            foreach (var fieldofwater in fieldOfWaters)
            {
                context.IdeasFieldOfWaters.Add(new IdeasFieldOfWater
                {
                    FieldOfWaterId = fieldofwater.Id,
                    Description = fieldofwater.Description,
                    Idea = ideaData
                });
            }
        }

        public List<KeyValuePair<int, string>> GetAllLabels()
        {
            using (var context = new IdeaPoolEntities())
            {
                List<FieldOfWater> fieldofwater = context.FieldOfWaters.Where(x => x.IsActive).ToList();
                return fieldofwater.OrderBy(x => x.Order).Select(x => new KeyValuePair<int, string>(x.Id, x.Name)).ToList();
            }
        }

        public List<int> FetchAllIds(int ideaId)
        {
            using (var context = new IdeaPoolEntities())
            {
                return context.IdeasFieldOfWaters
                    .Where(x => x.IdeaId == ideaId)
                    .Select(x => x.FieldOfWaterId)
                    .ToList();
            }
        }

        public List<FieldOfWaterDataObject> GetAll()
        {
            using (var context = new IdeaPoolEntities())
            {
                return context.FieldOfWaters
                    .Select(fieldofwater => new FieldOfWaterDataObject
                    {
                        Description = fieldofwater.Description,
                        Id = fieldofwater.Id,
                        Name = fieldofwater.Name,
                        Order = fieldofwater.Order,
                        IsActive = fieldofwater.IsActive
                    })
                    .ToList();
            }
        }

        public void Insert(FieldOfWaterDataObject fieldOfWater)
        {
            using (var context = new IdeaPoolEntities())
            {
                FieldOfWater other = context.FieldOfWaters.Where(x => x.Id == FIELDOFWATER_OTHER_ID).Single();               
                context
                    .FieldOfWaters
                    .Add(new FieldOfWater
                    {
                        CreatedByUserId = fieldOfWater.CreatedByUserId,
                        Name = fieldOfWater.Name,
                        Description = fieldOfWater.Description,
                        IsActive = true,
                        Order = other.Order // set the order to last but one
                    });
                // Increment the order of other field of water to last
                other.Order = other.Order + 1;
                context.Entry(other).State = System.Data.Entity.EntityState.Modified;
                context.SaveChanges();
            }
        }

        public void Activate(int fieldOfWaterId)
        {
            using (var context = new IdeaPoolEntities())
            {
                FieldOfWater fieldOfWater = context
                    .FieldOfWaters
                    .Where(x => x.Id == fieldOfWaterId)
                    .Single();
                fieldOfWater.IsActive = true;
                context.Entry(fieldOfWater).State = System.Data.Entity.EntityState.Modified;
                context.SaveChanges();
            }
        }

        public void Deactivate(int fieldOfWaterId)
        {
            using (var context = new IdeaPoolEntities())
            {
                FieldOfWater fieldofwater = context
                    .FieldOfWaters
                    .Where(x => x.Id == fieldOfWaterId)
                    .Single();
                fieldofwater.IsActive = false;
                context.Entry(fieldofwater).State = System.Data.Entity.EntityState.Modified;
                context.SaveChanges();
            }
        }
    }
}
