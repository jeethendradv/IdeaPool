using IMS.IdeaPool.Process;
using System;
using System.Collections.Generic;
using System.Linq;

namespace IMS.IdeaPool.Web.SignalR
{
    public class Group
    {
        public string Name
        {
            get
            {
                return name;
            }
        }
        private int IdeaId { get; set; }
        private string name { get; set; }
        private List<int> Users { get; set; }
        private List<int> ConnectedUsers { get; set; }
        private bool HasMarkedUnRead { get; set; }

        public Group(string name, List<int> users)
        {
            this.name = name;
            IdeaId = Convert.ToInt32(name);
            Users = users;
            ConnectedUsers = new List<int>();
        }

        public void Connect(int userid)
        {
            if (!ConnectedUsers.Contains(userid))
            {
                ConnectedUsers.Add(userid);
            }
        }

        public void Disconnect(int userid)
        {
            ConnectedUsers.Remove(userid);
            HasMarkedUnRead = false;
        }

        public bool IsEmpty()
        {
            return ConnectedUsers.Count == 0;
        }

        public void MarkUnRead()
        {
            if (!HasMarkedUnRead)
            {
                List<int> disconnectedUsers = Users.Except(ConnectedUsers).ToList();
                ProcessFactory.GetDiscussionProcess().MarkUnread(IdeaId, disconnectedUsers);
                HasMarkedUnRead = true;
            }
        }
    }
}