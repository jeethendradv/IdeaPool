using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using System.Linq;

namespace IMS.IdeaPool.Data
{
    internal class IdeaStatusData : IIdeaStatusData
    {
        public void Activate(int id)
        {
            using (var context = new IdeaPoolEntities())
            {
                IdeaStatus status = Get(context, id);
                status.IsActive = true;
                Update(context, status);
            }
        }

        public void Deactivate(int id)
        {
            using (var context = new IdeaPoolEntities())
            {
                IdeaStatus status = Get(context, id);
                status.IsActive = false;
                Update(context, status);
            }
        }

        public void Insert(IdeaStatusDataObject status)
        {
            using (var context = new IdeaPoolEntities())
            {
                context.IdeaStatus.Add(new IdeaStatus
                {
                    Color = status.Color,
                    CreatedByUserId = status.CreatedByUserId,
                    Description = status.Description,
                    Status = status.Name,
                    IsActive = true,
                    IsVisible = true,
                    Key = status.Name.Replace(" ", "").ToUpper()
                });
                context.SaveChanges();
            }
        }

        private IdeaStatus Get(IdeaPoolEntities context, int id)
        {
            return context.IdeaStatus.Where(x => x.Id == id).Single(); ;
        }

        private void Update(IdeaPoolEntities context, IdeaStatus status)
        {
            context.Entry(status).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
        }
    }
}
