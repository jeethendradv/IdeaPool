using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.Data.Keys;
using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Exceptions;
using IMS.IdeaPool.Process.Interfaces;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;

namespace IMS.IdeaPool.Process.Tests
{
    [TestClass]
    public class IdeaProcessTests
    {
        private Mock<ISettingsData> settingsData;
        private IdeaProcess process;
        private Mock<IIdeasData> ideasData;        

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
            SettingsGroupDataObject groupSettings = new SettingsGroupDataObject();
            groupSettings.Settings = settings;
            settingsData = new Mock<ISettingsData>();
            settingsData.Setup(s => s.GetGroupSettings(SettingsKeys.IdeaForm.GroupKEY)).Returns(groupSettings);

            IFieldofwaterData fieldOfWater = Mock.Of<IFieldofwaterData>();
            IFileProcess fileprocess = Mock.Of<IFileProcess>();
            ideasData = new Mock<IIdeasData>();
            ideasData.Setup(x => x.Insert(It.IsAny<IdeaDataObject>())).Returns(1);
            process = new IdeaProcess(fieldOfWater, settingsData.Object, ideasData.Object, fileprocess);
        }

        [TestMethod]
        [ExpectedException(typeof(FormException))]
        public void Save_should_throw_exception_when_title_is_Empty()
        {
            IdeaDataObject idea = new IdeaDataObject
            {
                Title = string.Empty,
                Description = "Description",
                FieldOfWater = new List<FieldOfWaterDataObject>
                {
                    new FieldOfWaterDataObject
                    {
                        Id  = -1
                    }
                },
                Files = new List<FileDataObject>
                {
                    new FileDataObject
                    {
                        Content = new byte[100]
                    }
                }
            };
            process.Save(idea);
        }

        [TestMethod]
        [ExpectedException(typeof(FormException))]
        public void Save_should_throw_exception_when_title_exceeds_configured_length()
        {
            IdeaDataObject idea = new IdeaDataObject
            {
                Title = "Title is greater than the configured length. Title is greater than the configured length.Title is greater than the configured length.",
                Description = "Description",
                FieldOfWater = new List<FieldOfWaterDataObject>
                {
                    new FieldOfWaterDataObject
                    {
                        Id = 1
                    }
                },
                Files = new List<FileDataObject>
                {
                    new FileDataObject
                    {
                        Content = new byte[100]
                    }
                }
            };
            process.Save(idea);
        }

        [TestMethod]
        [ExpectedException(typeof(FormException))]
        public void Save_should_throw_exception_when_fieldofwater_is_not_selected()
        {
            IdeaDataObject idea = new IdeaDataObject
            {
                Title = "Title",
                Description = "Description",
                FieldOfWater = new List<FieldOfWaterDataObject>(),
                Files = new List<FileDataObject>
                {
                    new FileDataObject
                    {
                        Content = new byte[100]
                    }
                }
            };
            process.Save(idea);
        }

        [TestMethod]
        [ExpectedException(typeof(FormException))]
        public void Save_should_throw_exception_when_Other_fieldofwater_is_selected_and_text_is_empty()
        {
            IdeaDataObject idea = new IdeaDataObject
            {
                Title = "Title",
                Description = "Description",
                FieldOfWater = new List<FieldOfWaterDataObject>
                {
                    new FieldOfWaterDataObject
                    {
                        Id = -1
                    }
                },
                Files = new List<FileDataObject>
                {
                    new FileDataObject
                    {
                        Content = new byte[100]
                    }
                }
            };
            process.Save(idea);
        }

        [TestMethod]
        [ExpectedException(typeof(FormException))]
        public void Save_should_throw_exception_when_description_is_Empty()
        {
            IdeaDataObject idea = new IdeaDataObject
            {
                Title = "Title",
                Description = string.Empty,
                FieldOfWater = new List<FieldOfWaterDataObject>
                {
                    new FieldOfWaterDataObject
                    {
                        Id = 1
                    }
                },
                Files = new List<FileDataObject>
                {
                    new FileDataObject
                    {
                        Content = new byte[100]
                    }
                }
            };
            process.Save(idea);
        }

        [TestMethod]
        [ExpectedException(typeof(FormException))]
        public void Save_should_throw_exception_when_description_exceeds_the_settings_length()
        {
            IdeaDataObject idea = new IdeaDataObject
            {
                Title = "Title",
                Description = @"Description is greater than the configured length. Description is greater than the configured length.Description is 
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
                                greater than the configured length",
                FieldOfWater = new List<FieldOfWaterDataObject>
                {
                    new FieldOfWaterDataObject
                    {
                        Id = 1
                    }
                },
                Files = new List<FileDataObject>
                {
                    new FileDataObject
                    {
                        Content = new byte[100]
                    }
                }
            };
            process.Save(idea);
        }

        [TestMethod]
        [ExpectedException(typeof(FormException))]
        public void Save_Should_throw_exception_when_number_of_files_exceeds_the_configuted_length()
        {
            IdeaDataObject idea = new IdeaDataObject
            {
                Title = "Title",
                Description = "Description",
                FieldOfWater = new List<FieldOfWaterDataObject>
                {
                    new FieldOfWaterDataObject
                    {
                        Id = 1
                    }
                },
                Files = new List<FileDataObject>
                {
                    new FileDataObject(),
                    new FileDataObject(),
                    new FileDataObject()
                }
            };
            process.Save(idea);
        }

        [TestMethod]
        [ExpectedException(typeof(FormException))]
        public void Save_should_throw_exception_when_file_size_exceeds_the_configuted_length()
        {
            IdeaDataObject idea = new IdeaDataObject
            {
                Title = "Title",
                Description = "Description",
                FieldOfWater = new List<FieldOfWaterDataObject>
                {
                    new FieldOfWaterDataObject
                    {
                        Id = 1
                    }
                },
                Files = new List<FileDataObject>
                {
                    new FileDataObject
                    {
                        Content = new byte[3145728]
                    }
                }
            };
            process.Save(idea);
        }

        [TestMethod]
        public void Save_should_not_throw_exception_when_all_the_values_are_with_in_the_configured_range()
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
            process.Save(idea);
            ideasData.Verify(x => x.Insert(It.IsAny<IdeaDataObject>()));
        }
    }
}
