CREATE TABLE [dbo].[Files] (
    [Id]          INT           IDENTITY (1, 1) NOT NULL,	
    [Name]        VARCHAR (255) NOT NULL,
    [ContentType] VARCHAR (255) NOT NULL,
    [Content]     VARBINARY(MAX) FILESTREAM NOT NULL,
	[Thumbnail] VARBINARY(MAX) FILESTREAM NOT NULL, 
	[SizeInKb] FLOAT NOT NULL, 
	[UniqueID] UNIQUEIDENTIFIER ROWGUIDCOL NOT NULL UNIQUE,
    [IdeaId] INT NOT NULL,    
    [IsUploadedViaDiscussions] BIT NOT NULL, 
    CONSTRAINT [PK_Images] PRIMARY KEY CLUSTERED ([Id] ASC), 
    CONSTRAINT [FK_Files_Ideas] FOREIGN KEY ([IdeaId]) REFERENCES [Ideas]([Id])
);

