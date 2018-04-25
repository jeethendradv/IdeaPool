CREATE TABLE [dbo].[Ideas] (
    [Id]             INT            IDENTITY (1, 1) NOT NULL,
	[UniqueId] UNIQUEIDENTIFIER NOT NULL, 
    [Title]          NVARCHAR (250) NOT NULL,
    [HtmlContent]        NVARCHAR (MAX) NOT NULL,
	[PlainContent] NVARCHAR(MAX) NOT NULL, 
    [UserId] INT NOT NULL, 
    [CreatedDate] DATETIME NOT NULL, 
    [LastUpdated] DATETIME NOT NULL, 
    [IdeaStatusId] INT NOT NULL,     
    [IsDraft] BIT NOT NULL,     
    CONSTRAINT [PK_Ideas] PRIMARY KEY CLUSTERED ([Id] ASC), 
    CONSTRAINT [FK_Ideas_User] FOREIGN KEY ([UserId]) REFERENCES [User]([Id]), 
    CONSTRAINT [FK_Ideas_IdeaStatus] FOREIGN KEY ([IdeaStatusId]) REFERENCES [IdeaStatus]([Id])
);


GO

CREATE INDEX [IX_Ideas_UniqueId] ON [dbo].[Ideas] ([UniqueId])

GO

CREATE FULLTEXT INDEX ON [dbo].[Ideas] ([Title], [HtmlContent]) KEY INDEX [PK_Ideas] ON [IdeaPoolCatalog] WITH CHANGE_TRACKING AUTO
