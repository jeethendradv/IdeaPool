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