CREATE TABLE [dbo].[Features]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Key] NVARCHAR(50) NOT NULL, 
    [Name] NVARCHAR(50) NOT NULL, 
    [Description] NVARCHAR(500) NOT NULL, 
    [IsActive] BIT NOT NULL
)
