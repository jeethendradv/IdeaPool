using IMS.IdeaPool.DataObjects;
using System.Collections.Generic;

namespace IMS.IdeaPool.Process.Interfaces
{
    public interface IErrorProcess
    {
        List<ErrorCode> GetAllErrorCodes();
    }
}
