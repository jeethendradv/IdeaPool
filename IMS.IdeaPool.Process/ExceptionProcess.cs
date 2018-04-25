using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Interfaces;

namespace IMS.IdeaPool.Process
{
    internal class ExceptionProcess : IExceptionProcess
    {
        private IExceptionData exceptionData;

        public ExceptionProcess(IExceptionData exceptionData)
        {
            this.exceptionData = exceptionData;
        }

        public void Insert(ExceptionDataObject exceptionObject)
        {
            exceptionData.Insert(exceptionObject);
        }
    }
}
