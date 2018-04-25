using IMS.IdeaPool.Data.Interceptor;
using System.Data.Entity.Infrastructure.Interception;

namespace IMS.IdeaPool.Data
{
    internal class IdeaPoolEntitiesFullTextSearch: IdeaPoolEntities
    {
        public IdeaPoolEntitiesFullTextSearch() : base()
        {
            DbInterception.Add(new FullTextSearch());
        }
    }
}
