CREATE TABLE [dbo].[SettingsGroup]
(
	[Id] INT NOT NULL IDENTITY ,     
    [Key] VARCHAR(50) NOT NULL, 
	[Name] VARCHAR(250) NOT NULL, 
    CONSTRAINT [PK_SettingGroup] PRIMARY KEY ([Id])
)
