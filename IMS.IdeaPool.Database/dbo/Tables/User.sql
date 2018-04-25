CREATE TABLE [dbo].[User] (
    [Id]                    INT           IDENTITY (1, 1) NOT NULL,
    [FirstName]             VARCHAR (50)  NOT NULL,
    [LastName]              VARCHAR (50)  NOT NULL,
    [Company]               VARCHAR (50)  NOT NULL,
    [Email]                 VARCHAR (255) NOT NULL,
    [Phone]                 VARCHAR (15)  NOT NULL,
	[CreateDate]			DATETIME	NOT NULL DEFAULT GETDATE(), 
    [IsSubscriptionEnabled] BIT           NOT NULL,
    [IsActive]              BIT           NOT NULL,    
    CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [AK_User_Email] UNIQUE NONCLUSTERED ([Email] ASC)
);

