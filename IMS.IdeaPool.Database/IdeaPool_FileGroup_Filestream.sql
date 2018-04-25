/*
Do not change the database path or name variables.
Any sqlcmd variables will be properly substituted during 
build and deployment.
*/
ALTER DATABASE [$(DatabaseName)]
	ADD FILEGROUP [IdeaPool_FileGroup_Filestream] CONTAINS FILESTREAM
