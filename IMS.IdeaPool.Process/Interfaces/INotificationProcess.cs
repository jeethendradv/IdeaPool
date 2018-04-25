using IMS.IdeaPool.DataObjects;

namespace IMS.IdeaPool.Process.Interfaces
{
    interface INotificationProcess
    {
        void IdeaCreated(MailSettings settings, string url);
    }
}
