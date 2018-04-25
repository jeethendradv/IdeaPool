using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Exceptions;
using IMS.IdeaPool.Process.Interfaces;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace IMS.IdeaPool.Process.Tests
{
    [TestClass]
    public class LoginProcessTests
    {
        [TestMethod]
        [ExpectedException(typeof(UserNameAndPasswordRequiredException))]
        public void ThrowUsernameAndPasswordRequiredException_when_username_is_empty()
        {
            IUserData userDataMock = Mock.Of<IUserData>();
            IUserForgotPassword userForgotPassword = Mock.Of<IUserForgotPassword>();
            ILoginProcess loginProcess = new LoginProcess(userDataMock, userForgotPassword);
            loginProcess.Authenticate(string.Empty, "password");
        }

        [TestMethod]
        [ExpectedException(typeof(UserNameAndPasswordRequiredException))]
        public void ThrowUsernameAndPasswordRequiredException_when_password_is_empty()
        {
            IUserData userDataMock = Mock.Of<IUserData>();
            IUserForgotPassword userForgotPassword = Mock.Of<IUserForgotPassword>();
            ILoginProcess loginProcess = new LoginProcess(userDataMock, userForgotPassword);
            loginProcess.Authenticate("jeethendra", string.Empty);
        }

        [TestMethod]
        [ExpectedException(typeof(UserNameAndPasswordRequiredException))]
        public void ThrowUsernameAndPasswordRequiredException_when_username_or_password_is_empty()
        {
            IUserData userDataMock = Mock.Of<IUserData>();
            IUserForgotPassword userForgotPassword = Mock.Of<IUserForgotPassword>();
            ILoginProcess loginProcess = new LoginProcess(userDataMock, userForgotPassword);
            loginProcess.Authenticate(string.Empty, string.Empty);
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidCredentialsException))]
        public void ThrowInvalidCredentialsException_when_username_or_password_is_incorrect()
        {
            UserDataObject userobject = null;
            string username = "jeethendra";
            string password = "password";
            var userDataMock = new Mock<IUserData>();
            userDataMock.Setup(x => x.Get(username)).Returns(userobject);
            IUserForgotPassword userForgotPassword = Mock.Of<IUserForgotPassword>();
            ILoginProcess loginProcess = new LoginProcess(userDataMock.Object, userForgotPassword);
            loginProcess.Authenticate(username, password);
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidCredentialsException))]
        public void ThrowInvalidCredentialException_when_user_is_inactive()
        {
            string username = "jeethendra";
            string password = "password";
            UserDataObject userobject = new UserDataObject
            {
                Id = 1,
                FirstName = "firstname",
                LastName = "lastname",
                EncryptedPassword = IGenProtector.Encrypt(password),
                IsActive = false,
                IsAccountActivated = true
            };

            var userDataMock = new Mock<IUserData>();
            userDataMock.Setup(x => x.Get(username)).Returns(userobject);
            IUserForgotPassword userForgotPassword = Mock.Of<IUserForgotPassword>();
            ILoginProcess loginProcess = new LoginProcess(userDataMock.Object, userForgotPassword);
            loginProcess.Authenticate(username, password);
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidCredentialsException))]
        public void ThrowInvalidCredentialException_when_password_is_incorrect()
        {
            string username = "jeethendra";
            string password = "password";
            UserDataObject userobject = new UserDataObject
            {
                Id = 1,
                FirstName = "firstname",
                LastName = "lastname",
                EncryptedPassword = IGenProtector.Encrypt("somepassword"),
                IsActive = false,
                IsAccountActivated = true
            };

            var userDataMock = new Mock<IUserData>();
            userDataMock.Setup(x => x.Get(username)).Returns(userobject);
            IUserForgotPassword userForgotPassword = Mock.Of<IUserForgotPassword>();
            ILoginProcess loginProcess = new LoginProcess(userDataMock.Object, userForgotPassword);
            loginProcess.Authenticate(username, password);
        }

        [TestMethod]
        public void ReturnUserObject_when_usercredentials_are_valid()
        {
            string username = "jeethendra";
            string password = "password";
            UserDataObject userobject = new UserDataObject
            {
                Id = 1,
                FirstName = "firstname",
                LastName = "lastname",
                EncryptedPassword = IGenProtector.Encrypt(password),
                IsActive = true,
                IsAccountActivated = true
            };
            
            var userDataMock = new Mock<IUserData>();
            userDataMock.Setup(x => x.Get(username)).Returns(userobject);
            IUserForgotPassword userForgotPassword = Mock.Of<IUserForgotPassword>();
            ILoginProcess loginProcess = new LoginProcess(userDataMock.Object, userForgotPassword);
            UserDataObject result = loginProcess.Authenticate(username, password);

            Assert.AreEqual(userobject.Id, result.Id);
            Assert.AreEqual(userobject.FirstName, result.FirstName);
            Assert.AreEqual(userobject.LastName, result.LastName);
        }

        [TestMethod]
        [ExpectedException(typeof(AccountNotActivatedException))]
        public void Authenticate_throws_AccountNotActivatedException_when_account_is_not_activated()
        {
            string username = "jeethendra";
            string password = "password";
            UserDataObject userobject = new UserDataObject
            {
                Id = 1,
                FirstName = "firstname",
                LastName = "lastname",
                EncryptedPassword = IGenProtector.Encrypt(password),
                IsActive = true,
                IsAccountActivated = false
            };

            var userDataMock = new Mock<IUserData>();
            userDataMock.Setup(x => x.Get(username)).Returns(userobject);
            IUserForgotPassword userForgotPassword = Mock.Of<IUserForgotPassword>();
            ILoginProcess loginProcess = new LoginProcess(userDataMock.Object, userForgotPassword);
            UserDataObject result = loginProcess.Authenticate(username, password);
        }
    }
}
