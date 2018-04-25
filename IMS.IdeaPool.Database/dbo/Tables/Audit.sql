CREATE TABLE [dbo].[Audit]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [TypeId] INT NOT NULL, 
    [LoginUserId] INT NOT NULL, 
    [IdeaId] INT NULL, 
    [Description] NVARCHAR(501) NULL, 
    [UpdateUserId] INT NULL, 
    [CreateDate] DATETIME NOT NULL, 
    CONSTRAINT [FK_Audit_User_LoginUserId] FOREIGN KEY ([LoginUserId]) REFERENCES [User]([Id]), 
    CONSTRAINT [FK_Audit_User_UpdateUserId] FOREIGN KEY ([UpdateUserId]) REFERENCES [User]([Id]), 
    CONSTRAINT [FK_Audit_Ideas] FOREIGN KEY ([IdeaId]) REFERENCES [Ideas]([Id]), 
    CONSTRAINT [FK_Audit_AuditType] FOREIGN KEY ([TypeId]) REFERENCES [AuditType]([Id])
)
