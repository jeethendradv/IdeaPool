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