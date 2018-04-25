CREATE TABLE [dbo].[FieldOfWater] (
    [Id]   INT          IDENTITY (1, 1) NOT NULL,
    [Name] VARCHAR (50) NOT NULL,
	[Description] NVARCHAR(500) NOT NULL, 
    [Order] INT NOT NULL, 
    [IsActive] BIT NOT NULL,
	[CreatedByUserId] INT NOT NULL,
    CONSTRAINT [PK_FieldOfWater] PRIMARY KEY CLUSTERED ([Id] ASC), 
    CONSTRAINT [FK_FieldOfWater_User] FOREIGN KEY ([CreatedByUserId]) REFERENCES [User]([Id])
);

