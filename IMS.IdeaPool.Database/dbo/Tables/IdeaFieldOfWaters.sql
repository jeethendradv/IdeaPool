CREATE TABLE [dbo].[IdeasFieldOfWaters]
(
	[IdeaId] INT NOT NULL , 
    [FieldOfWaterId] INT NOT NULL, 
    [Description] VARCHAR(50) NULL, 
    CONSTRAINT [FK_IdeasFieldOfWaters_Ideas] FOREIGN KEY ([IdeaId]) REFERENCES [Ideas]([Id]), 
    CONSTRAINT [FK_IdeasFieldOfWaters_FieldOfWater] FOREIGN KEY ([FieldOfWaterId]) REFERENCES [FieldOfWater]([Id]), 
    CONSTRAINT [PK_IdeasFieldOfWaters] PRIMARY KEY ([FieldOfWaterId], [IdeaId])
)
