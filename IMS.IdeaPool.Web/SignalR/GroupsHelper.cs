using IMS.IdeaPool.Process;
using System;
using System.Collections.Generic;
using System.Linq;

namespace IMS.IdeaPool.Web.SignalR
{
    public static class GroupsHelper
    {
        public static List<Group> Groups { get; set; }
        static GroupsHelper()
        {
            Groups = new List<Group>();
        }

        private static Group CreateGroup(string channelName)
        {
            Group group = null;
            if (!Groups.Any(g => g.Name == channelName))
            {
                int ideaid = Convert.ToInt32(channelName);
                int creatorUserId = ProcessFactory.GetIdeaProcess().GetCreatorUserId(ideaid);
                List<int> users = ProcessFactory.GetUserProcess().GetOwnerUserIds();
                group = new Group(channelName, users.Concat(new List<int> { creatorUserId }).ToList());
                Groups.Add(group);
            }
            else
            {
                group = Groups.Single(g => g.Name == channelName);
            }
            return group;
        }

        public static void AddUserToGroup(string channelName, int userId)
        {
            Group group = Get(channelName);
            if (group == null)
            {
                group = CreateGroup(channelName);
            }
            group.Connect(userId);
        }

        public static void RemoveUserFromGroup(string channelName, int userId)
        {
            Group group = Get(channelName);
            if (group != null)
            {
                group.Disconnect(userId);
                if (group.IsEmpty())
                {
                    Groups.Remove(group);
                }
            }
        }

        public static void RemoveUserFromAllGroups(int userId)
        {
            Groups.ForEach(group => group.Disconnect(userId));
            List<string> groups = Groups.Where(x => x.IsEmpty()).Select(x => x.Name).ToList();
            foreach (var name in groups)
            {
                Groups.Remove(Groups.Single(x => x.Name == name));                
            }
        }

        public static void MarkUnReadForOfflineUsers(string channelName)
        {
            Group group = Get(channelName);
            if (group != null)
            {
                group.MarkUnRead();
            }
        }

        private static Group Get(string channelName)
        {
            return Groups.SingleOrDefault(x => x.Name == channelName);
        }
    }
}