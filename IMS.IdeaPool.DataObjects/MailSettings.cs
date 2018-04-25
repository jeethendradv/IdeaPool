using System.Collections.Generic;

namespace IMS.IdeaPool.DataObjects
{
    public class MailSettings
    {
        public MailSettings()
        {
            Tos = new List<string>();
        }
        public string From { get; set; }
        public bool IsHtmlBody { get; set; }
        public string Subject { get; set; }
        public string Host { get; set; }
        public bool EnableSsl { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int Port { get; set; }
        public List<string> Tos { get; set; }
    }
}
