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