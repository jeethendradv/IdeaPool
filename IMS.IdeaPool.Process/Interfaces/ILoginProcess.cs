using IMS.IdeaPool.DataObjects;

namespace IMS.IdeaPool.Process.Interfaces
{
    public interface ILoginProcess
    {
        UserDataObject Authenticate(string email, string password);
        bool Activate(string email);
    }
}
