using IMS.IdeaPool.DataObjects;

namespace IMS.IdeaPool.Process.Interfaces
{
    public interface IRegistrationProcess
    {
        bool IsRegisteredEmailAddress(string email);
        int Register(UserDataObject user);
    }
}
