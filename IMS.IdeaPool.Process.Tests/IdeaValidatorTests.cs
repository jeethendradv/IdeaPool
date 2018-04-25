using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Validators;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;

namespace IMS.IdeaPool.Process.Tests
{
    [TestClass]
    public class IdeaValidatorTests
    {
        private IdeaValidator validator;        

        [TestInitialize]
        public void init()
        {
            List<SettingsDataObject> settings = new List<SettingsDataObject>
            {
                new SettingsDataObject{Key = "IDEA_TITLE_LENGTH", Value= "25" },
                new SettingsDataObject{Key = "IDEA_CONTENT_LENGTH", Value= "1000" },
                new SettingsDataObject{Key = "IDEA_FILE_LIMIT", Value= "2" },
                new SettingsDataObject{Key = "IDEA_FILE_MAX_SIZE", Value= "2" },
                new SettingsDataObject{Key = "IDEA_SHOW_OTHER_FIELDOFWATER", Value= "true" }
            };
            SettingsGroupDataObject ideaSettings = new SettingsGroupDataObject();
            ideaSettings.Settings = settings;
            validator = new IdeaValidator(ideaSettings);
        }

        [TestMethod]
        public void ErrorCodes_should_be_populated_when_title_is_empty()
        {
            IdeaDataObject idea = new IdeaDataObject();
            validator.IsValid(idea);
            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.IdeaForm.ERROR_IDEAFORM_TITLE_REQUIRED));
        }

        [TestMethod]
        public void ErrorCodes_should_be_populated_when_title_exceeds_the_settings_length()
        {
            IdeaDataObject idea = new IdeaDataObject();
            idea.Title = "Title is greater than the configured length. Title is greater than the configured length.Title is greater than the configured length.";
            validator.IsValid(idea);
            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.IdeaForm.ERROR_IDEAFORM_TITLE_LENGTH));
        }

        [TestMethod]
        public void ErrorCodes_should_be_populated_when_fieldOfwater_is_not_selected()
        {
            IdeaDataObject idea = new IdeaDataObject();
            validator.IsValid(idea);
            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.IdeaForm.ERROR_IDEAFORM_FIELDOFWATER_REQUIRED));
        }

        [TestMethod]
        public void ErrorCodes_should_be_populated_when_Other_fieldofwater_is_selected_and_text_is_empty()
        {
            IdeaDataObject idea = new IdeaDataObject();
            idea.FieldOfWater = new List<FieldOfWaterDataObject>
                {
                    new FieldOfWaterDataObject
                    {
                        Id = -1
                    }
                };
            validator.IsValid(idea);
            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.IdeaForm.ERROR_IDEAFORM_FIELDOFWATER_OTHER_REQUIRED));
        }

        [TestMethod]
        public void ErrorCodes_should_be_populated_when_description_is_empty()
        {
            IdeaDataObject idea = new IdeaDataObject();
            validator.IsValid(idea);
            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.IdeaForm.ERROR_IDEAFORM_DESCRIPTION_REQUIRED));
        }

        [TestMethod]
        public void ErrorCodes_should_be_populated_when_description_exceeds_the_settings_length()
        {
            IdeaDataObject idea = new IdeaDataObject();
            idea.Description = @"Description is greater than the configured length. Description is greater than the configured length.Description is 
                greater than the configured length. Description is greater than the configured length. Description is greater than the configured length.Description is 
                greater than the configured lengthDescription is greater than the configured length. Description is greater than the configured length.Description is 
                greater than the configured lengthDescription is greater than the configured length. Description is greater than the configured length.Description is 
                greater than the configured lengthDescription is greater than the configured length. Description is greater than the configured length.Description is 
                greater than the configured lengthDescription is greater than the configured length. Description is greater than the configured length.Description is 
                greater than the configured lengthDescription is greater than the configured length. Description is greater than the configured length.Description is 
                greater than the configured lengthDescription is greater than the configured length. Description is greater than the configured length.Description is 
                greater than the configured lengthDescription is greater than the configured length. Description is greater than the configured length.Description is 
                greater than the configured lengthDescription is greater than the configured length. Description is greater than the configured length.Description is 
                greater than the configured lengthDescription is greater than the configured length. Description is greater than the configured length.Description is 
                greater than the configured lengthDescription is greater than the configured length. Description is greater than the configured length.Description is 
                greater than the configured length";
            validator.IsValid(idea);
            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.IdeaForm.ERROR_IDEAFORM_DESCRIPTION_LENGTH));
        }

        [TestMethod]
        public void ErrorCodes_should_be_populated_when_number_of_files_exceeds_the_configuted_length()
        {
            IdeaDataObject idea = new IdeaDataObject();
            idea.Files = new List<FileDataObject>
            {
                new FileDataObject(),
                new FileDataObject(),
                new FileDataObject()
            };
            validator.IsValid(idea);
            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.IdeaForm.ERROR_IDEAFORM_FILE_LIMIT));
        }

        [TestMethod]
        public void ErrorCodes_should_be_populated_when_file_size_exceeds_the_configuted_length()
        {
            IdeaDataObject idea = new IdeaDataObject();
            idea.Files = new List<FileDataObject>
            {
                new FileDataObject
                {
                    Content = new byte[3145728]
                }
            };
            validator.IsValid(idea);
            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.IdeaForm.ERROR_IDEAFORM_FILE_LIMIT));
        }

        [TestMethod]
        public void ErrorCodes_should_not_be_populated_when_all_the_values_are_with_in_the_configured_range()
        {
            IdeaDataObject idea = new IdeaDataObject()
            {
                Title = "Some title",
                Description = "Description",
                FieldOfWater = new List<FieldOfWaterDataObject>
                {
                    new FieldOfWaterDataObject {Id = 1},
                    new FieldOfWaterDataObject {Id = 2},
                    new FieldOfWaterDataObject {Id = -1, Description = "Some other text"}
                },
                Files = new List<FileDataObject>
                {
                    new FileDataObject
                    {
                        Content = new byte[1048576]
                    }
                }
            };
            validator.IsValid(idea);
            Assert.IsTrue(validator.ErrorCodes.Count == 0);
        }
    }
}
