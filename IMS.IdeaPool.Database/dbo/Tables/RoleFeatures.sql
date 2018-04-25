CREATE TABLE [dbo].[RoleFeatures]
(
	[RoleId] INT NOT NULL , 
    [FeatureId] INT NOT NULL, 
    PRIMARY KEY ([FeatureId], [RoleId]), 
    CONSTRAINT [FK_RoleFeatures_Roles] FOREIGN KEY ([RoleId]) REFERENCES [Roles]([Id]), 
    CONSTRAINT [FK_RoleFeatures_Features] FOREIGN KEY ([FeatureId]) REFERENCES [Features]([Id])
)
