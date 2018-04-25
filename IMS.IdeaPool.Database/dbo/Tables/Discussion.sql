CREATE TABLE [dbo].[Discussion]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [IdeaId] INT NOT NULL, 
    [UserId] INT NOT NULL, 
    [Message] NVARCHAR(250) NULL, 
    [FileId] INT NULL, 
    [CreateDate] DATETIME NOT NULL, 
    CONSTRAINT [CK_Discussion_Message] CHECK (([Message] is Not null) or ([Message] is null and FileId is not null)), 
    CONSTRAINT [FK_Discussion_Ideas] FOREIGN KEY ([IdeaId]) REFERENCES [Ideas]([Id]), 
    CONSTRAINT [FK_Discussion_User] FOREIGN KEY ([UserId]) REFERENCES [User]([Id]), 
    CONSTRAINT [FK_Discussion_Files] FOREIGN KEY ([FileId]) REFERENCES [Files]([Id])
)
