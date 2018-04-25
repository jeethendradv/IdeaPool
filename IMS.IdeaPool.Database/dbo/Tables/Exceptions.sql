CREATE TABLE [dbo].[Exceptions]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Message] NVARCHAR(500) NOT NULL, 
    [CallStack] NVARCHAR(MAX) NOT NULL, 
    [UserId] INT NULL, 
    [CreatedDate] DATETIME NOT NULL, 
    [UserAgent] NVARCHAR(500) NULL, 
    [ExceptionType] NVARCHAR(50) NOT NULL, 
    CONSTRAINT [FK_Exceptions_User] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])
)
