namespace IMS.IdeaPool.Web.SignalR
{
    public class MessageBase
    {
        public string ChannelName { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
    }
}