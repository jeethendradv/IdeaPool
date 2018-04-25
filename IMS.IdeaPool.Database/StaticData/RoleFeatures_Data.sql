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