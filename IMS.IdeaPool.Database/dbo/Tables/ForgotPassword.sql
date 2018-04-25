CREATE TABLE [dbo].[ForgotPassword]
(
	[UserId] INT NOT NULL PRIMARY KEY, 
    [Token] VARCHAR(15) NOT NULL, 
    [ExpiryDateTime] DATETIME NOT NULL, 
    CONSTRAINT [FK_ForgotPassword_User] FOREIGN KEY (UserId) REFERENCES [User]([Id]), 
    CONSTRAINT [AK_ForgotPassword_Token] UNIQUE ([Token])
)
