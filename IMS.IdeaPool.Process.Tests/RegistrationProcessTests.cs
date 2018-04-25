using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Exceptions;
using IMS.IdeaPool.Process.Interfaces;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace IMS.IdeaPool.Process.Tests
{
    [TestClass]
    public class RegistrationProcessTests
    {
        [TestMethod]
        public void Return_false_if_email_isnot_registered()
        {
            string email = "jeethendrv@IMS.co.nz";
            var mockUserData = new Mock<IUserData>();
            mockUserData.Setup(x => x.GetEmailAddress(email)).Returns(string.Empty);
            IRegistrationProcess registrationProcess = new RegistrationProcess(mockUserData.Object);
            bool isregistered = registrationProcess.IsRegisteredEmailAddress(email);

            Assert.IsFalse(isregistered);
        }

        [TestMethod]
        public void Return_true_if_email_is_registered()
        {
            string email = "jeethendrv@IMS.co.nz";
            var mockUserData = new Mock<IUserData>();
            mockUserData.Setup(x => x.GetEmailAddress(email)).Returns(email);
            IRegistrationProcess registrationProcess = new RegistrationProcess(mockUserData.Object);
            bool isregistered = registrationProcess.IsRegisteredEmailAddress(email);

            Assert.IsTrue(isregistered);
        }

        [TestMethod]
        [ExpectedException(typeof(RegistrationException))]
        public void Register_throws_Exception_when_invalid_user_inforation_ispassed()
        {
            UserDataObject user = new UserDataObject();
            var mockUserData = new Mock<IUserData>();
            mockUserData.Setup(x => x.GetEmailAddress(string.Empty)).Returns(string.Empty);
            RegistrationProcess process = new RegistrationProcess(mockUserData.Object);
            process.Register(user);
        }

        [TestMethod]
        public void Register_doest_not_throw_exception_when_user_info_isvalid()
        {
            UserDataObject user = new UserDataObject
            {
                FirstName = "Jeethendra",
                LastName = "dv",
                Password = "Some12",
                RePassword = "Some12",
                Company = "IMS Group",
                Phone = "02041170361"
            };
            var mockUserData = new Mock<IUserData>();
            mockUserData.Setup(x => x.GetEmailAddress(string.Empty)).Returns(string.Empty);
        }
    }
}
