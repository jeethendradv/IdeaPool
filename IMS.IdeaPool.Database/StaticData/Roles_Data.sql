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