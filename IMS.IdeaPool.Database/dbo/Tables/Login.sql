CREATE TABLE [dbo].[Login] (
    [UserId]    INT          NOT NULL,
    [Password]  VARCHAR (50) NOT NULL,
    [LastLogin] DATETIME     NULL,
    [IsActivated] BIT NOT NULL, 
    CONSTRAINT [PK_Login_1] PRIMARY KEY CLUSTERED ([UserId] ASC),
    CONSTRAINT [FK_Login_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id])
);

