using IMS.IdeaPool.DataObjects;

namespace IMS.IdeaPool.Process.Interfaces
{
    public interface IExceptionProcess
    {
        void Insert(ExceptionDataObject exceptionObject);
    }
}
