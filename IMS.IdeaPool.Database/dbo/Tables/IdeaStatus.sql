CREATE TABLE [dbo].[IdeaStatus]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Status] VARCHAR(50) NOT NULL, 
	[Key] VARCHAR(50) NOT NULL,
    [Description] VARCHAR(250) NOT NULL, 
    [Color] VARCHAR(50) NOT NULL, 
    [IsActive] BIT NOT NULL, 
    [IsVisible] BIT NOT NULL, 
    [CreatedByUserId] INT NOT NULL, 
    CONSTRAINT [FK_IdeaStatus_User] FOREIGN KEY ([CreatedByUserId]) REFERENCES [User]([Id])    
)
