using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process;
using IMS.IdeaPool.Web.ActionFilters;
using IMS.IdeaPool.Web.Helpers;
using Microsoft.AspNet.SignalR;
using System;
using System.Threading.Tasks;

namespace IMS.IdeaPool.Web.SignalR
{
    [Authenticate]
    public class DiscussionHub : Hub
    {
        const string OWNER_GROUP_NAME = "owner";
        public void SendToGroup(MessageInfo messageInfo)
        {
            ProcessFactory.GetDiscussionProcess().InsertMessage(Convert.ToInt32(messageInfo.ChannelName), messageInfo.UserId, messageInfo.Message);
            Clients.Group(messageInfo.ChannelName).receiveMessage(messageInfo.ChannelName, messageInfo.UserId, messageInfo.UserName, messageInfo.Message);
            Clients.Group(OWNER_GROUP_NAME).notifyOwners(messageInfo.ChannelName, messageInfo.UserId, messageInfo.UserName, messageInfo.Message);
            GroupsHelper.MarkUnReadForOfflineUsers(messageInfo.ChannelName);
        }

        public void SendFile(FileInfo fileInfo)
        {
            int ideaId = Convert.ToInt32(fileInfo.ChannelName);
            ProcessFactory.GetDiscussionProcess().InsertFile(ideaId, fileInfo.UserId, fileInfo.FileId);
            FileDataObject file = ProcessFactory.GetFileProcess().FetchThumbnail(fileInfo.FileId, ideaId);
            Clients.Group(fileInfo.ChannelName).receiveFile(fileInfo.ChannelName, fileInfo.UserId, fileInfo.UserName, fileInfo.FileId, file.Name, file.ThumbnailBase64, file.ContentType, file.IsImage);
            Clients.Group(OWNER_GROUP_NAME).notifyOwners(fileInfo.ChannelName, fileInfo.UserId, fileInfo.UserName, null);
            GroupsHelper.MarkUnReadForOfflineUsers(fileInfo.ChannelName);
        }

        public Task AddToGroup(string channelName)
        {
            int creatorUserId = ProcessFactory.GetIdeaProcess().GetCreatorUserId(Convert.ToInt32(channelName));
            UserPrincipal user = Context.User as UserPrincipal;
            if (user.Id != creatorUserId)
            {
                Clients.User(creatorUserId.ToString()).joinGroup(channelName);
            }
            GroupsHelper.AddUserToGroup(channelName, user.Id);
            return Groups.Add(Context.ConnectionId, channelName);
        }

        public Task RemoveFromGroup(string channelName)
        {
            UserPrincipal user = Context.User as UserPrincipal;
            GroupsHelper.RemoveUserFromGroup(channelName, user.Id);

            return Groups.Remove(Context.ConnectionId, channelName);
        }

        public override Task OnConnected()
        {
            UserPrincipal user = Context.User as UserPrincipal;
            if (ProcessFactory.GetUserProcess().IsOwnerOrReviewer(user.Id))
            {
                Groups.Add(Context.ConnectionId, OWNER_GROUP_NAME);
            }
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            UserPrincipal user = Context.User as UserPrincipal;
            GroupsHelper.RemoveUserFromAllGroups(user.Id);
            return base.OnDisconnected(stopCalled);
        }
    }
}