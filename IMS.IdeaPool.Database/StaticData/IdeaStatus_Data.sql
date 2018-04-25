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