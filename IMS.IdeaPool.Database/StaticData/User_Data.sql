BEGIN TRY
	PRINT 'Insert User Data...'
	BEGIN TRANSACTION;
	-- Insert system user
	SET IDENTITY_INSERT [User] ON;
	INSERT INTO [User] ([Id], [FirstName], [LastName], [Company], Email, Phone, CreateDate, IsSubscriptionEnabled, IsActive) 
	VALUES (-1, 'System', 'iGen', 'IMS', 'igen@ims.co.nz', ' ', getutcdate(), 0, 1)
	SET IDENTITY_INSERT [User] OFF;
	-- Get admin role id
	DECLARE @Admin_Role_Id int
	SELECT 
		@Admin_Role_Id = Id
	FROM 
		Roles
	WHERE 
		[Key] = 'ADMIN'
	-- Insert admin role to System User
	INSERT INTO [UserRoles] ([UserId], [RoleId])
	VALUES (-1, @Admin_Role_Id)	
	-- Insert into Login table - Password is 'System12'
	INSERT INTO [Login] (UserId, [Password], LastLogin, IsActivated)
	VALUES (-1, 'kOQba4t8rMLTW2Gx8XEaHw==', null, 1)
	COMMIT TRANSACTION;
END TRY
BEGIN CATCH
	SELECT
        ERROR_NUMBER() as ErrorNumber,
        ERROR_MESSAGE() as ErrorMessage;
    -- Test whether the transaction is uncommittable.
    IF (XACT_STATE()) = -1
    BEGIN
        PRINT
            N'The transaction is in an uncommittable state. ' +
            'Rolling back transaction.'
        ROLLBACK TRANSACTION;
    END;
    -- Test whether the transaction is active and valid.
    IF (XACT_STATE()) = 1
    BEGIN
        PRINT
            N'The transaction is committable. ' +
            'Committing transaction.'
        COMMIT TRANSACTION;   
    END;
END CATCH;
GO