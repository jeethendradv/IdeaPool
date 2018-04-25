CREATE TABLE [dbo].[IdeaHistory]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [IdeaId] INT NOT NULL, 
    [UserId] INT NOT NULL, 
    [ActivityId] INT NOT NULL, 
    [Description] VARCHAR(500) NOT NULL, 
    [CreateDate] DATETIME NOT NULL, 
    CONSTRAINT [FK_IdeaHistory_Ideas] FOREIGN KEY ([IdeaId]) REFERENCES [Ideas]([Id]), 
    CONSTRAINT [FK_IdeaHistory_User] FOREIGN KEY ([UserId]) REFERENCES [User]([Id]), 
    CONSTRAINT [FK_IdeaHistory_Activity] FOREIGN KEY ([ActivityId]) REFERENCES [Activity]([Id])
)
