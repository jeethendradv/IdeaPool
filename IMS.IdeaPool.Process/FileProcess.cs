using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Exceptions;
using IMS.IdeaPool.Process.Interfaces;
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Reflection;

namespace IMS.IdeaPool.Process
{
    internal class FileProcess : IFileProcess
    {
        private IFileData fileData;
        private IIdeasData ideaData;
        private IUserData userData;

        public FileProcess(IFileData fileData, IIdeasData ideaData, IUserData userData)
        {
            this.fileData = fileData;
            this.ideaData = ideaData;
            this.userData = userData;
        }

        public int Insert(FileDataObject file, int ideaId, int userId)
        {
            if (!(ideaData.GetCreatorUserId(ideaId) == userId || userData.IsOwnerOrReviewer(userId)))
            {
                throw new PermissionException();
            }
            file.Thumbnail = GetThumbnail(file);
            return fileData.Insert(file, ideaId);
        }

        public byte[] GetThumbnail(FileDataObject file)
        {
            byte[] thumbNail = null;
            if (file.IsImage)
            {
                using (MemoryStream ms = new MemoryStream(file.Content))
                using (MemoryStream outStream = new MemoryStream())
                {
                    Image img = Image.FromStream(ms);
                    using (Image thumbNailImage = img.GetThumbnailImage(182, 150, () => false, IntPtr.Zero))
                    {
                        var imageEncoder = ImageCodecInfo.GetImageEncoders()
                            .Where(codecInfo => codecInfo.MimeType == file.ContentType.ToLowerInvariant())
                            .First();
                        using (var encParams = new EncoderParameters(1))
                        {
                            long quality = 100;
                            encParams.Param[0] = new EncoderParameter(Encoder.Quality, quality);
                            thumbNailImage.Save(outStream, imageEncoder, encParams);
                            thumbNail = outStream.ToArray();
                        }
                    }
                }
            }
            else
            {
                thumbNail = IsPdf(file.ContentType) ? GetFileIconStream("pdf") : GetFileIconStream("file");
            }

            return thumbNail;
        }

        public FileDataObject Fetch(int ideaId, int fileId)
        {
            if (ideaId == 0 || fileId == 0)
            {
                throw new CustomException("Invalid parameters.");
            }
            FileDataObject file = fileData.Fetch(ideaId, fileId);
            if (file == null)
            {
                throw new CustomException("File not found.");
            }
            return file;
        }

        public FileDataObject FetchThumbnail(int fileId, int ideaId)
        {
            if (fileId == 0)
            {
                throw new CustomException("Invalid parameters.");
            }
            FileDataObject file = fileData.FetchThumbnail(fileId, ideaId);
            if (file == null)
            {
                throw new CustomException("File not found.");
            }
            return file;
        }

        private byte[] GetFileIconStream(string fileTypeName)
        {
            string resourceTemplate = "IMS.IdeaPool.Process.FileIcons.{0}.png";
            var assembly = Assembly.GetExecutingAssembly();
            byte[] buffer = new byte[16 * 1024];
            using (Stream stream = assembly.GetManifestResourceStream(string.Format(resourceTemplate, fileTypeName)))
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = stream.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }

        private bool IsPdf(string contenttype)
        {
            return contenttype.ToLowerInvariant().Equals("application/pdf");
        }

        private ImageFormat GetImageFormat(string contentType)
        {
            ImageFormat format = null;
            switch (contentType.ToLowerInvariant())
            {
                case "image/jpeg":
                case "image/jpg":
                    format = ImageFormat.Jpeg;
                    break;

                case "image/png":
                    format = ImageFormat.Png;
                    break;
            }
            return format;
        }
    }
}
