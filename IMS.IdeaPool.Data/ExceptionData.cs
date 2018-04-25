using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using System;

namespace IMS.IdeaPool.Data
{
    internal class ExceptionData : IExceptionData
    {
        public void Insert(ExceptionDataObject exceptionObject)
        {
            using (var context = new IdeaPoolEntities())
            {
                Exception exception = new Exception
                {
                    Message = exceptionObject.Message,
                    CallStack = exceptionObject.CallStack,
                    CreatedDate = DateTime.UtcNow,
                    ExceptionType = exceptionObject.ExceptionType,
                    UserId = exceptionObject.UserId,
                    UserAgent = exceptionObject.UserAgent
                };
                context.Exceptions.Add(exception);
                context.SaveChanges();
            }
        }
    }
}
