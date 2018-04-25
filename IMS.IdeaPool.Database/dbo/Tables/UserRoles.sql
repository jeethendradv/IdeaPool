CREATE TABLE [dbo].[UserRoles]
(
	[UserId] INT NOT NULL , 
    [RoleId] INT NOT NULL, 
    PRIMARY KEY ([UserId], [RoleId]), 
    CONSTRAINT [FK_UserRoles_User] FOREIGN KEY ([UserId]) REFERENCES [User]([Id]), 
    CONSTRAINT [FK_UserRoles_Roles] FOREIGN KEY ([RoleId]) REFERENCES [Roles]([Id])
)
