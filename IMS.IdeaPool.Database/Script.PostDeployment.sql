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

:r .\StaticData\Activity_Data.sql
:r .\StaticData\Features_Data.sql
:r .\StaticData\Roles_Data.sql
:r .\StaticData\RoleFeatures_Data.sql
:r .\StaticData\User_Data.sql
:r .\StaticData\Settings_Data.sql
:r .\StaticData\AuditType_Data.sql
:r .\StaticData\FieldOfWater_Data.sql
:r .\StaticData\IdeaStatus_Data.sql