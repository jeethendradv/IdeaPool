using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using System;
using System.Collections.Generic;
using System.Linq;

namespace IMS.IdeaPool.Data
{
    internal class FileData : IFileData
    {
        public void Insert(IdeaPoolEntities context, List<FileDataObject> files, int ideaId)
        {
            foreach (var file in files)
            {
                context.Files.Add(new File
                {
                    Content = file.Content,
                    ContentType = file.ContentType,
                    IdeaId = ideaId,
                    Name = file.Name,
                    Thumbnail = file.Thumbnail,
                    SizeInKb = file.SizeInKb,
                    UniqueID = Guid.NewGuid(),
                    IsUploadedViaDiscussions = file.IsUploadedViaDiscussions
                });
            }
        }

        public void Insert(IdeaPoolEntities context, List<FileDataObject> files, Idea ideaData)
        {
            foreach (var file in files)
            {
                context.Files.Add(new File
                {
                    Content = file.Content,
                    ContentType = file.ContentType,
                    Idea = ideaData,
                    Name = file.Name,
                    Thumbnail = file.Thumbnail,
                    SizeInKb = file.SizeInKb,
                    UniqueID = Guid.NewGuid(),
                    IsUploadedViaDiscussions = file.IsUploadedViaDiscussions
                });
            }
        }

        public int Insert(FileDataObject file, int ideaId)
        {
            int fileId;
            using (var context = new IdeaPoolEntities())
            {
                File dbFile = new File
                {
                    Content = file.Content,
                    ContentType = file.ContentType,
                    IdeaId = ideaId,
                    Name = file.Name,
                    Thumbnail = file.Thumbnail,
                    SizeInKb = file.SizeInKb,
                    UniqueID = Guid.NewGuid(),
                    IsUploadedViaDiscussions = file.IsUploadedViaDiscussions
                };
                context.Files.Add(dbFile);
                context.SaveChanges();
                fileId = dbFile.Id;
            }
            return fileId;
        }

        public FileDataObject Fetch(int ideaId, int fileId)
        {
            FileDataObject file = null;
            using (var context = new IdeaPoolEntities())
            {
                var selectedFile = context.Files
                    .Where(x => x.Id == fileId && x.IdeaId == ideaId)
                    .Select(x => new
                    {
                        x.Id,
                        x.Content,
                        x.ContentType,
                        x.Name
                    }).SingleOrDefault();
                if (selectedFile != null)
                {
                    file = new FileDataObject
                    {
                        Id = selectedFile.Id,
                        Content = selectedFile.Content,
                        ContentType = selectedFile.ContentType,
                        Name = selectedFile.Name
                    };
                }
            }
            return file;
        }

        public FileDataObject FetchThumbnail(int fileId, int ideaId)
        {
            FileDataObject file = null;
            using (var context = new IdeaPoolEntities())
            {
                var selectedFile = context.Files
                    .Where(x => x.Id == fileId && x.IdeaId == ideaId)
                    .Select(x => new
                    {
                        x.Id,
                        x.Thumbnail,
                        x.ContentType,
                        x.Name
                    }).SingleOrDefault();
                if (selectedFile != null)
                {
                    file = new FileDataObject
                    {
                        Id = selectedFile.Id,
                        Thumbnail = selectedFile.Thumbnail,
                        ThumbnailBase64 = Convert.ToBase64String(selectedFile.Thumbnail),
                        ContentType = selectedFile.ContentType,
                        Name = selectedFile.Name
                    };
                }
            }
            return file;
        }
    }
}
