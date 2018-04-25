using IMS.IdeaPool.Data.Keys;
using IMS.IdeaPool.DataObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using ErrorConstants = IMS.IdeaPool.Process.ErrorCodes;

namespace IMS.IdeaPool.Process.Validators
{
    internal class IdeaValidator
    {
        private SettingsGroupDataObject ideaSettings;
        public IdeaValidator(SettingsGroupDataObject ideaSettings)
        {
            ErrorCodes = new List<int>();
            this.ideaSettings = ideaSettings == null ? new SettingsGroupDataObject() : ideaSettings;
        }

        public List<int> ErrorCodes;
        public bool IsValid(IdeaDataObject idea)
        {
            validateTitle(idea.Title);
            validateFieldOfWater(idea);
            validateDescription(idea.Description);
            validateFiles(idea.Files);
            return ErrorCodes.Count == 0;
        }

        private void validateTitle(string title)
        {
            if (string.IsNullOrEmpty(title))
            {
                ErrorCodes.Add(ErrorConstants.IdeaForm.ERROR_IDEAFORM_TITLE_REQUIRED);
            }
            else if (title.Length > this.ideaSettings.GetValue<int>(SettingsKeys.IdeaForm.TITLE_LENGTH))
            {
                ErrorCodes.Add(ErrorConstants.IdeaForm.ERROR_IDEAFORM_TITLE_LENGTH);
            }
        }

        private void validateFieldOfWater(IdeaDataObject idea)
        {
            if (idea.FieldOfWater.Count == 0)
            {
                ErrorCodes.Add(ErrorConstants.IdeaForm.ERROR_IDEAFORM_FIELDOFWATER_REQUIRED);
            }
            else if (idea.FieldOfWater.Find(x => x.Id == -1) != null && string.IsNullOrEmpty(idea.FieldOfWater.Find(x => x.Id == -1).Description))
            {
                ErrorCodes.Add(ErrorConstants.IdeaForm.ERROR_IDEAFORM_FIELDOFWATER_OTHER_REQUIRED);
            }
        }

        private void validateDescription(string description)
        {
            if (string.IsNullOrEmpty(description))
            {
                ErrorCodes.Add(ErrorConstants.IdeaForm.ERROR_IDEAFORM_DESCRIPTION_REQUIRED);
            }
            else if (description.Replace(Environment.NewLine, string.Empty).Length > ideaSettings.GetValue<int>(SettingsKeys.IdeaForm.CONTENT_LENGTH))
            {
                ErrorCodes.Add(ErrorConstants.IdeaForm.ERROR_IDEAFORM_DESCRIPTION_LENGTH);
            }
        }

        private void validateFiles(List<FileDataObject> files)
        {
            if (files.Where(x => !x.IsUploadedViaDiscussions).Count() > ideaSettings.GetValue<int>(SettingsKeys.IdeaForm.FILE_LIMIT)
                || files.Where(x => x.Id == 0).Any(x => (x.SizeInKb/1024) > ideaSettings.GetValue<float>(SettingsKeys.IdeaForm.FILE_MAX_SIZE)))
            {
                ErrorCodes.Add(ErrorConstants.IdeaForm.ERROR_IDEAFORM_FILE_LIMIT);
            }
        }
    }
}
