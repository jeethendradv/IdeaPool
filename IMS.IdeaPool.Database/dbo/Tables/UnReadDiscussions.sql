CREATE TABLE [dbo].[UnReadDiscussions]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
	[UserId] INT NOT NULL , 
    [IdeaId] INT NOT NULL,     
    CONSTRAINT [FK_UnReadDiscussions_User] FOREIGN KEY ([UserId]) REFERENCES [User]([Id]), 
    CONSTRAINT [FK_UnReadDiscussions_Ideas] FOREIGN KEY ([IdeaId]) REFERENCES [Ideas]([Id])
)

GO

CREATE UNIQUE NONCLUSTERED INDEX [IX_UnReadDiscussions_UserId_IdeaId] ON [dbo].[UnReadDiscussions] ([UserId], [IdeaId])
