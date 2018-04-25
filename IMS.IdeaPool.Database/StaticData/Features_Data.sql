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