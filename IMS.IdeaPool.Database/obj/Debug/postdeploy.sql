/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

/*
	Insert Field of water data.
*/

BEGIN TRY
	PRINT 'Insert Activity Data...'
	BEGIN TRANSACTION;
	
	INSERT INTO Activity ([Key], [Name])
	VALUES
		('UPDATE_IDEA_STATUS', 'Update Idea Status')
		, ('UPDATE_IDEA_DETAILS', 'Update Idea Details')

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
BEGIN TRY
	PRINT 'Insert Features Data...'
	BEGIN TRANSACTION;
	
	INSERT INTO Features ([Key], [Name], [Description], [IsActive]) 
	VALUES 
		('SUBMIT_IDEA', 'Submit Idea', 'This feature allows the user to submit the idea', 1)
		, ('VIEW_IDEAS_OF_OTHERS', 'View ideas submitted by users', 'This feature allows the user to see the idea submitted by others', 1)
		, ('VIEW_IDEAS', 'View ideas submitted by you.', 'This feature allows the user to see the ideas submitted by them.', 1)
		, ('UPDATE_IDEA_STATUS', 'Update Idea Status.', 'This feature allows the user to update the idea status.', 1)
		, ('USER_SEARCH', 'Search Users.', 'This feature allows the user to search for other users in the system.', 1)
		, ('USER_EDIT', 'Update User information', 'This feature allows the user to update other users information in the system.', 1)
		, ('SETTINGS_EDIT', 'Edit Settings', 'This feature allows the user to edit the settings of the system.', 1)
		, ('EXPORT_IDEAS', 'Export Ideas', 'This feature allows the user to export ideas to excel or pdf.', 1)
		, ('PRINT_IDEA', 'Print Idea', 'This feature allows the user to print an idea.', 1)

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
BEGIN TRY
	PRINT 'Insert Roles Data...'
	BEGIN TRANSACTION;
	
	INSERT INTO Roles 
		([Name], [Key], [Description]) 
	VALUES 
		('Submitter', 'SUBMITTER', 'Submitter is a person outside of IMS Group, they need to register with the system and Submit the idea. They cannot publish or read any blogs or newsletters.')
		, ('Employee', 'EMPLOYEE', 'The Employee can use the IMS credentials to Login to Idea Generator. They can discuss on the ideas they submit and can edit/update their ideas. The Employee can also publish the blog and read others blog and newsletters.')
		, ('Reviewer', 'REVIEWER', 'Has all the privileges of the employee and additionally they can view ideas of all the users and discuss on the ideas.')
		, ('Owner', 'OWNER','Has all the privileges of the Reviewer and can update the status of the Idea.')
		, ('Admin', 'ADMIN','They can manage all the users of the system, edit user info, publish blogs or newsletters and manage some content fields like “Field of water”, etc.')
	
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
BEGIN TRY
	PRINT 'Insert RoleFeatures Data...'
    BEGIN TRANSACTION;
	DECLARE 
		@SUBMITTER_ROLE_KEY NVARCHAR(50) = 'SUBMITTER',
		@EMPLOYEE_Role_KEY NVARCHAR(50) = 'EMPLOYEE',
		@REVIEWER_Role_KEY NVARCHAR(50) = 'REVIEWER',
		@OWNER_Role_KEY NVARCHAR(50) = 'OWNER',
		@ADMIN_Role_KEY NVARCHAR(50) = 'ADMIN'

	DECLARE
		@SUBMIT_IDEA_Feature_KEY NVARCHAR(50) = 'SUBMIT_IDEA',
		@VIEW_IDEAS_OF_OTHERS_Feature_KEY NVARCHAR(50) = 'VIEW_IDEAS_OF_OTHERS',
		@VIEW_IDEAS_Feature_KEY NVARCHAR(50) = 'VIEW_IDEAS',
		@UPDATE_IDEA_STATUS_Feature_Key VARCHAR(50) = 'UPDATE_IDEA_STATUS',
		@USER_SEARCH_Feature_Key VARCHAR(50) = 'USER_SEARCH',
		@USER_EDIT_Feature_Key VARCHAR(50) = 'USER_EDIT',
		@SETTINGS_EDIT_Feature_Key VARCHAR(50) = 'SETTINGS_EDIT',
		@EXPORT_IDEAS_Feature_Key VARCHAR(50) = 'EXPORT_IDEAS',
		@PRINT_IDEA_Feature_Key VARCHAR(50) = 'PRINT_IDEA'

	DECLARE
		@SUBMITTER_Role_id INT,
		@EMPLOYEE_Role_id INT,
		@REVIEWER_Role_id INT,
		@OWNER_Role_id INT,
		@ADMIN_Role_id INT

	DECLARE
		@SUBMIT_IDEA_Feature_id INT,
		@VIEW_IDEAS_OF_OTHERS_Feature_id INT,
		@VIEW_IDEAS_Id INT,
		@UPDATE_IDEA_STATUS_ID INT,
		@USER_SEARCH_Feature_Id INT,
		@USER_EDIT_Feature_Id INT,
		@SETTINGS_EDIT_Feature_Id INT,
		@EXPORT_IDEAS_Feature_Id INT,
		@PRINT_IDEA_Feature_Id INT

	-- Fetch the role id for all the roles.
	SELECT @SUBMITTER_Role_id = Id FROM Roles WHERE [Key] = @SUBMITTER_ROLE_KEY
	SELECT @EMPLOYEE_Role_id = Id FROM Roles WHERE [Key] = @EMPLOYEE_Role_KEY
	SELECT @REVIEWER_Role_id = Id FROM Roles WHERE [Key] = @REVIEWER_Role_KEY
	SELECT @OWNER_Role_id = Id FROM Roles WHERE [Key] = @OWNER_Role_KEY
	SELECT @ADMIN_Role_id = Id FROM Roles WHERE [Key] = @ADMIN_Role_KEY

	-- Fetch the feature id for all the features.
	SELECT @SUBMIT_IDEA_Feature_id = Id FROM Features WHERE [Key] = @SUBMIT_IDEA_Feature_KEY
	SELECT @VIEW_IDEAS_OF_OTHERS_Feature_id = Id FROM Features WHERE [Key] = @VIEW_IDEAS_OF_OTHERS_Feature_KEY
	SELECT @VIEW_IDEAS_Id = Id FROM Features WHERE [Key] = @VIEW_IDEAS_Feature_KEY
	SELECT @UPDATE_IDEA_STATUS_ID = Id FROM Features where [Key] = @UPDATE_IDEA_STATUS_Feature_Key
	SELECT @USER_SEARCH_Feature_Id = Id FROM Features WHERE [Key] = @USER_SEARCH_Feature_Key
	SELECT @USER_EDIT_Feature_Id = Id FROM Features WHERE [Key] = @USER_EDIT_Feature_Key
	SELECT @SETTINGS_EDIT_Feature_Id = Id FROM Features WHERE [Key] = @SETTINGS_EDIT_Feature_Key
	SELECT @EXPORT_IDEAS_Feature_Id = Id FROM Features WHERE [Key] = @EXPORT_IDEAS_Feature_Key
	SELECT @PRINT_IDEA_Feature_Id = Id FROM Features WHERE [Key] = @PRINT_IDEA_Feature_Key

	-- set features for submitter
	INSERT INTO RoleFeatures (RoleId, FeatureId) 
	VALUES 
		(@SUBMITTER_Role_id, @VIEW_IDEAS_Id)
		, (@SUBMITTER_Role_id, @SUBMIT_IDEA_Feature_id)

	-- set features for employee
	INSERT INTO RoleFeatures (RoleId, FeatureId) 
	VALUES 
		(@EMPLOYEE_Role_id, @VIEW_IDEAS_Id)
		, (@EMPLOYEE_Role_id, @SUBMIT_IDEA_Feature_id)

	-- set features for reviewer
	INSERT INTO RoleFeatures (RoleId, FeatureId) 
	VALUES 
		(@REVIEWER_Role_id, @VIEW_IDEAS_Id)
		, (@REVIEWER_Role_id, @SUBMIT_IDEA_Feature_id)
		, (@REVIEWER_Role_id, @VIEW_IDEAS_OF_OTHERS_Feature_id)
		, (@REVIEWER_Role_id, @USER_SEARCH_Feature_Id)
		, (@REVIEWER_Role_id, @EXPORT_IDEAS_Feature_Id)
		, (@REVIEWER_Role_id, @PRINT_IDEA_Feature_Id)

	--set features for owner
	INSERT INTO RoleFeatures (RoleId, FeatureId) 
	VALUES 
		(@OWNER_Role_id, @VIEW_IDEAS_Id)
		, (@OWNER_Role_id, @SUBMIT_IDEA_Feature_id)
		, (@OWNER_Role_id, @VIEW_IDEAS_OF_OTHERS_Feature_id)
		, (@OWNER_Role_id, @UPDATE_IDEA_STATUS_ID)
		, (@OWNER_Role_id, @USER_SEARCH_Feature_Id)
		, (@OWNER_Role_id, @EXPORT_IDEAS_Feature_Id)
		, (@OWNER_Role_id, @PRINT_IDEA_Feature_Id)

	-- set features for admin
	INSERT INTO RoleFeatures (RoleId, FeatureId) 
	VALUES 
		(@ADMIN_Role_id, @VIEW_IDEAS_Id)
		, (@ADMIN_Role_id, @SUBMIT_IDEA_Feature_id)
		, (@ADMIN_Role_id, @USER_SEARCH_Feature_Id)
		, (@ADMIN_Role_id, @USER_EDIT_Feature_Id)
		, (@ADMIN_Role_id, @SETTINGS_EDIT_Feature_Id)

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
BEGIN TRY
	PRINT 'Insert Settings Data...'
	BEGIN TRANSACTION;
	
	SET IDENTITY_INSERT SettingsGroup ON;
	INSERT INTO SettingsGroup ([Id], [Key], [Name]) VALUES (1, 'IDEA_FORM', 'Idea Form')
	SET IDENTITY_INSERT SettingsGroup OFF;

	INSERT INTO Settings ([Key], [Value], [Description], [GroupId], Limit, [Type]) 
	VALUES 
		('IDEA_TITLE_LENGTH', '25', 'Idea Title Length', 1, 250, 'number')
		, ('IDEA_CONTENT_LENGTH', '1000', 'Idea Content Length', 1, null, 'number')
		, ('IDEA_FILE_LIMIT', '5', 'Number of files allowed to upload while submitting idea', 1, null, 'number')
		, ('IDEA_FILE_MAX_SIZE', '2', 'Upload file size in MB', 1, null, 'number')
	
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
BEGIN TRY
	PRINT 'Insert AuditType Data...'
	BEGIN TRANSACTION;
	
	INSERT INTO AuditType ([Key], [Description])
	VALUES
		('VIEW_IDEA', 'Idea Viewed')
		, ('EDIT_IDEA', 'Idea Edited')
		, ('IDEA_STATUS_UPDATE', 'Idea status updated')
		, ('VIEW_USER_DETAILS', 'User details viewed')
		, ('ADD_USER_ROLE', 'User role added')
		, ('REMOVE_USER_ROLE', 'User role removed')
		, ('USER_ACTIVATED', 'User activated')
		, ('USER_DEACTIVATED', 'User deactivated')
		, ('USER_LOGIN_ACTIVE', 'Login activated')
		, ('USER_LOGIN_DEACTIVE', 'Login deactivated')
		, ('USER_PROFILE_UPDATE', 'Profile updated')
		, ('PASSWORD_RESET', 'Password reset')
		, ('USER_LOGIN', 'User login')
		, ('USER_LOGOUT', 'User logout')
		, ('SETTINGS_EDIT', 'Settings updated')
		, ('FIELDOFWATER_ACTIVATED', 'Field of water activated')
		, ('FIELDOFWATER_DEACTIVATED', 'Field of water deactivated')
		, ('IDEASTATUS_ACTIVATED', 'Idea status activated')
		, ('IDEASTATUS_DEACTIVATED', 'Idea status deactivated')
		, ('FILE_DOWNLOAD', 'Idea file downloaded')
		, ('FILE_VIEW', 'Idea file viewed')
		, ('IDEAS_EXPORT', 'Ideas exported')
		, ('PRINT_IDEA', 'Idea printed')
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
BEGIN TRY
	PRINT 'Insert FieldOfWater Data...'
	BEGIN TRANSACTION;
	DBCC CHECKIDENT ('[FieldOfWater]', RESEED, 1);

	DECLARE @System_UserId INT = -1
	SET IDENTITY_INSERT FieldOfWater ON;
	INSERT INTO FieldOfWater ([Id], [Name], [Description], [Order], [IsActive], [CreatedByUserId]) 
	VALUES (-1, 'Other', 'User is allowed to enter custom field of water text.', 5, 1, @System_UserId)
	SET IDENTITY_INSERT FieldOfWater OFF;

	INSERT INTO FieldOfWater ([Name], [Description], [Order], [IsActive], [CreatedByUserId]) 
	VALUES 
		('Drinking water', 'Drinking water, also known as potable water, is water that is safe to drink or to use for food preparation.', 1, 1, @System_UserId)
		, ('Waste water', 'Wastewater (or waste water) is any water that has been affected by human or animal use.', 2, 1, @System_UserId)
		, ('Storm water', 'Storm water is surface water runoff associated with a rain or snow event.', 3, 1, @System_UserId)
		, ('Industrial water', 'Industrial water includes water used for such purposes as fabricating, processing, washing, diluting, cooling, or transporting a product; incorporating water into a product; or for sanitation needs within the manufacturing facility.', 4, 1, @System_UserId)	
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
BEGIN TRY
	PRINT 'Insert IdeaStatus Data...'
	BEGIN TRANSACTION;
	DECLARE @System_UserId INT = -1
	DBCC CHECKIDENT ('[IdeaStatus]', RESEED, 1);
	SET IDENTITY_INSERT IdeaStatus ON;
	INSERT INTO IdeaStatus (Id, [Status], [Key], [Description], Color, IsActive, IsVisible, [CreatedByUserId]) 
	VALUES 
		(1, 'Submitted', 'SUBMITTED', '', '#92a378', 1, 1, @System_UserId)
		, (2, 'Idea Review', 'IDEA_REVIEW', '', '#6f9634', 1, 1, @System_UserId)
		, (3, 'Feasibility stage', 'FEASIBILITY_STAGE', '', '#9fa8a0', 1, 1, @System_UserId)
		, (4, 'Prototyping', 'PROTOTYPING', '', '#a0bc84', 1, 1, @System_UserId)
		, (5, 'Market Launch', 'MARKET_LAUNCH', '', '#9e95c6', 1, 1, @System_UserId)
		, (6, 'Stop', 'STOP', '', '#a89086', 1, 1, @System_UserId)
		, (7, 'Hold', 'HOLD', '', '#808d93', 1, 1, @System_UserId)
		, (8, 'Recyle', 'RECYCLE', '', '#bfb9b9', 1, 1, @System_UserId)
		, (9, 'Draft', 'DRAFT', '', '#da9008', 1, 0, @System_UserId)
	SET IDENTITY_INSERT IdeaStatus OFF;  
	
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
