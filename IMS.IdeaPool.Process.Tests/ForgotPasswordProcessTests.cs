using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Exceptions;
using IMS.IdeaPool.Process.Interfaces;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;

namespace IMS.IdeaPool.Process.Tests
{
    [TestClass]
    public class ForgotPasswordProcessTests
    {
        [TestMethod]
        [ExpectedException(typeof(RequiredFieldException))]
        public void GetForgotPasswordToken_throws_exception_when_email_is_nullorempty()
        {
            string email = string.Empty;
            var userDataMock = new Mock<IUserData>();
            var userForgotPasswordMock = new Mock<IUserForgotPassword>();
            IForgotPasswordProcess forgotPassword = new ForgotPasswordProcess(userDataMock.Object, userForgotPasswordMock.Object);
            forgotPassword.GetForgotPasswordToken(email);
        }

        [TestMethod]
        public void GetForgotPasswordToken_returns_empty_token_when_email_isnot_registered()
        {
            string email = "jeethendradv@live.com";
            UserDataObject user = null;
            var userDataMock = new Mock<IUserData>();
            userDataMock.Setup(u => u.Get(email)).Returns(user);
            var userForgotPasswordMock = new Mock<IUserForgotPassword>();
            IForgotPasswordProcess forgotPassword = new ForgotPasswordProcess(userDataMock.Object, userForgotPasswordMock.Object);
            string token = forgotPassword.GetForgotPasswordToken(email);

            Assert.IsTrue(string.IsNullOrEmpty(token));
        }

        [TestMethod]
        public void GetForgotPasswordToken_return_token_when_email_is_valid()
        {
            string email = "jeethendradv@live.com";
            UserDataObject user = new UserDataObject
            {
                Id = 1,
                Email = email
            };
            var userDataMock = new Mock<IUserData>();
            userDataMock.Setup(u => u.Get(email)).Returns(user);
            var userForgotPasswordMock = new Mock<IUserForgotPassword>();
            IForgotPasswordProcess forgotPassword = new ForgotPasswordProcess(userDataMock.Object, userForgotPasswordMock.Object);
            string token = forgotPassword.GetForgotPasswordToken(email);

            Assert.IsTrue(!string.IsNullOrEmpty(token));
        }

        [TestMethod]
        public void IsValidPasswordToken_should_return_false_when_no_token_is_found()
        {
            string token = "1234567890";
            ForgotPasswordTokenObject tokenObject = null;

            var userDataMock = new Mock<IUserData>();
            var userForgotPasswordMock = new Mock<IUserForgotPassword>();
            userForgotPasswordMock.Setup(x => x.Get(token)).Returns(tokenObject);
            IForgotPasswordProcess forgotPassword = new ForgotPasswordProcess(userDataMock.Object, userForgotPasswordMock.Object);
            bool isvalid = forgotPassword.IsValidPasswordToken(token);

            Assert.IsFalse(isvalid);
        }

        [TestMethod]
        public void IsValidPasswordToken_should_return_false_when_no_token_is_Expired()
        {
            string token = "1234567890";
            ForgotPasswordTokenObject tokenObject = new ForgotPasswordTokenObject
            {
                Token = token,
                ExpiryDateTime = DateTime.UtcNow.AddDays(-2)
            };

            var userDataMock = new Mock<IUserData>();
            var userForgotPasswordMock = new Mock<IUserForgotPassword>();
            userForgotPasswordMock.Setup(x => x.Get(token)).Returns(tokenObject);
            IForgotPasswordProcess forgotPassword = new ForgotPasswordProcess(userDataMock.Object, userForgotPasswordMock.Object);
            bool isvalid = forgotPassword.IsValidPasswordToken(token);

            Assert.IsFalse(isvalid);
        }

        [TestMethod]
        public void IsValidPasswordToken_should_return_false_when_valid_token_is_returned()
        {
            string token = "1234567890";
            ForgotPasswordTokenObject tokenObject = new ForgotPasswordTokenObject
            {
                Token = token,
                ExpiryDateTime = DateTime.UtcNow.AddHours(4)
            };

            var userDataMock = new Mock<IUserData>();
            var userForgotPasswordMock = new Mock<IUserForgotPassword>();
            userForgotPasswordMock.Setup(x => x.Get(token)).Returns(tokenObject);
            IForgotPasswordProcess forgotPassword = new ForgotPasswordProcess(userDataMock.Object, userForgotPasswordMock.Object);
            bool isvalid = forgotPassword.IsValidPasswordToken(token);

            Assert.IsTrue(isvalid);
        }

        [TestMethod]
        [ExpectedException(typeof(PasswordTokenExpiredException))]
        public void ResetPassword_should_throw_exception_when_token_is_not_found()
        {
            string token = "1234567890";
            ForgotPasswordTokenObject tokenObject = null;

            var userDataMock = new Mock<IUserData>();
            var userForgotPasswordMock = new Mock<IUserForgotPassword>();
            userForgotPasswordMock.Setup(x => x.Get(token)).Returns(tokenObject);
            IForgotPasswordProcess forgotPassword = new ForgotPasswordProcess(userDataMock.Object, userForgotPasswordMock.Object);
            forgotPassword.ResetPassword(token, string.Empty, string.Empty);
        }

        [TestMethod]
        [ExpectedException(typeof(PasswordTokenExpiredException))]
        public void ResetPassword_should_throw_exception_when_token_is_Expired()
        {
            string token = "1234567890";
            ForgotPasswordTokenObject tokenObject = new ForgotPasswordTokenObject
            {
                Token = token,
                ExpiryDateTime = DateTime.UtcNow.AddDays(-2)
            };

            var userDataMock = new Mock<IUserData>();
            var userForgotPasswordMock = new Mock<IUserForgotPassword>();
            userForgotPasswordMock.Setup(x => x.Get(token)).Returns(tokenObject);
            IForgotPasswordProcess forgotPassword = new ForgotPasswordProcess(userDataMock.Object, userForgotPasswordMock.Object);
            forgotPassword.ResetPassword(token, string.Empty, string.Empty);
        }

        [TestMethod]
        [ExpectedException(typeof(FormException))]
        public void ResetPassword_should_throw_exception_when_password_is_empty()
        {
            string token = "1234567890";
            string password = string.Empty;
            string repassword = string.Empty;
            ForgotPasswordTokenObject tokenObject = new ForgotPasswordTokenObject
            {
                Token = token,
                ExpiryDateTime = DateTime.UtcNow.AddDays(2)
            };

            var userDataMock = new Mock<IUserData>();
            var userForgotPasswordMock = new Mock<IUserForgotPassword>();
            userForgotPasswordMock.Setup(x => x.Get(token)).Returns(tokenObject);
            IForgotPasswordProcess forgotPassword = new ForgotPasswordProcess(userDataMock.Object, userForgotPasswordMock.Object);
            forgotPassword.ResetPassword(token, password, repassword);
        }

        [TestMethod]
        [ExpectedException(typeof(FormException))]
        public void ResetPassword_should_throw_exception_when_password_is_above_10_characters()
        {
            string token = "1234567890";
            string password = "SomeSome123";
            string repassword = "SomeSome123";
            ForgotPasswordTokenObject tokenObject = new ForgotPasswordTokenObject
            {
                Token = token,
                ExpiryDateTime = DateTime.UtcNow.AddDays(2)
            };

            var userDataMock = new Mock<IUserData>();
            var userForgotPasswordMock = new Mock<IUserForgotPassword>();
            userForgotPasswordMock.Setup(x => x.Get(token)).Returns(tokenObject);
            IForgotPasswordProcess forgotPassword = new ForgotPasswordProcess(userDataMock.Object, userForgotPasswordMock.Object);
            forgotPassword.ResetPassword(token, password, repassword);
        }

        [TestMethod]
        [ExpectedException(typeof(FormException))]
        public void ResetPassword_should_throw_exception_when_password_is_below_10_characters()
        {
            string token = "1234567890";
            string password = "Se123";
            string repassword = "Se123";
            ForgotPasswordTokenObject tokenObject = new ForgotPasswordTokenObject
            {
                Token = token,
                ExpiryDateTime = DateTime.UtcNow.AddDays(2)
            };

            var userDataMock = new Mock<IUserData>();
            var userForgotPasswordMock = new Mock<IUserForgotPassword>();
            userForgotPasswordMock.Setup(x => x.Get(token)).Returns(tokenObject);
            IForgotPasswordProcess forgotPassword = new ForgotPasswordProcess(userDataMock.Object, userForgotPasswordMock.Object);
            forgotPassword.ResetPassword(token, password, repassword);
        }

        [TestMethod]
        [ExpectedException(typeof(FormException))]
        public void ResetPassword_should_throw_exception_when_passwords_do_not_match()
        {
            string token = "1234567890";
            string password = "Some12";
            string repassword = "Some123";
            ForgotPasswordTokenObject tokenObject = new ForgotPasswordTokenObject
            {
                Token = token,
                ExpiryDateTime = DateTime.UtcNow.AddDays(2)
            };

            var userDataMock = new Mock<IUserData>();
            var userForgotPasswordMock = new Mock<IUserForgotPassword>();
            userForgotPasswordMock.Setup(x => x.Get(token)).Returns(tokenObject);
            IForgotPasswordProcess forgotPassword = new ForgotPasswordProcess(userDataMock.Object, userForgotPasswordMock.Object);
            forgotPassword.ResetPassword(token, password, repassword);
        }

        [TestMethod]
        public void ResetPassword_should_call_forgotpassworddata_method_when_token_password_are_valid()
        {
            string token = "1234567890";
            string password = "Some12";
            string repassword = "Some12";
            ForgotPasswordTokenObject tokenObject = new ForgotPasswordTokenObject
            {
                Token = token,
                ExpiryDateTime = DateTime.UtcNow.AddDays(2)
            };

            var userDataMock = new Mock<IUserData>();
            var userForgotPasswordMock = new Mock<IUserForgotPassword>();
            userForgotPasswordMock.Setup(x => x.Get(token)).Returns(tokenObject);
            IForgotPasswordProcess forgotPassword = new ForgotPasswordProcess(userDataMock.Object, userForgotPasswordMock.Object);
            forgotPassword.ResetPassword(token, password, repassword);

            userForgotPasswordMock.Verify(x => x.ResetPassword(token, IGenProtector.Encrypt(password)));
        }
    }
}
