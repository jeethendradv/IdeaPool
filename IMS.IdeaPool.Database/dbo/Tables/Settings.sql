CREATE TABLE [dbo].[Settings]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Key] VARCHAR(50) NOT NULL, 
    [Value] VARCHAR(50) NOT NULL, 
    [Description] VARCHAR(250) NOT NULL, 
    [GroupId] INT NOT NULL, 
    [Limit] VARCHAR(50) NULL, 
    [Type] VARCHAR(50) NULL, 
    CONSTRAINT [FK_Settings_SettingsGroup] FOREIGN KEY ([GroupId]) REFERENCES [SettingsGroup]([Id])
)
