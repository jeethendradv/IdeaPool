using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Validators;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMS.IdeaPool.Process.Tests
{
    [TestClass]
    public class RegistrationValidatorTests
    {
        [TestMethod]
        public void IsValid_Returns_validCode_when_Required_fields_are_Empty()
        {
            var mockobject = new Mock<IUserData>();
            mockobject.Setup(x => x.GetEmailAddress(string.Empty)).Returns(string.Empty);
            RegistrationValidator validator = new RegistrationValidator(mockobject.Object);
            validator.IsValid(new UserDataObject());

            // Firstname is required
            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.Registration.ERROR_FIRSTNAME_REQUIRED));

            // Lastname is required
            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.Registration.ERROR_LASTNAME_REQUIRED));

            // Password is required
            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.Password.ERROR_PASSWORD_REQUIRED));

            // Retype password is required
            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.Password.ERROR_REPASSWORD_REQUIRED));

            // Email address is required
            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.Registration.ERROR_EMAIL_REQUIRED));

            // Company is required
            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.Registration.ERROR_COMPANY_REQUIRED));

            // Phone is required
            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.Registration.ERROR_PHONE_REQUIRED));
        }

        [TestMethod]
        public void IsValid_should_return_password_invalid_errorcode_when_password_isbelow_6_characters()
        {
            var mockobject = new Mock<IUserData>();
            mockobject.Setup(x => x.GetEmailAddress(string.Empty)).Returns(string.Empty);
            RegistrationValidator validator = new RegistrationValidator(mockobject.Object);
            validator.IsValid(new UserDataObject
            {
                Password = "Some1",
                RePassword = "Some1"
            });

            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.Password.ERROR_PASSWORD_STRENGTH));
        }

        [TestMethod]
        public void IsValid_should_return_password_invalid_errorcode_when_password_isabove_10_characters()
        {
            var mockobject = new Mock<IUserData>();
            mockobject.Setup(x => x.GetEmailAddress(string.Empty)).Returns(string.Empty);
            RegistrationValidator validator = new RegistrationValidator(mockobject.Object);
            validator.IsValid(new UserDataObject
            {
                Password = "Some12Hkipl",
                RePassword = "Some12Hkipl"
            });

            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.Password.ERROR_PASSWORD_STRENGTH));
        }

        [DataTestMethod]
        [DataRow("Some12", "")]
        [DataRow("Some12", "some12")]
        public void Isvalid_should_return_password_donotmatch_errorcode_when_passwords_are_different(string password, string repassword)
        {
            var mockobject = new Mock<IUserData>();
            mockobject.Setup(x => x.GetEmailAddress(string.Empty)).Returns(string.Empty);
            RegistrationValidator validator = new RegistrationValidator(mockobject.Object);
            validator.IsValid(new UserDataObject
            {
                Password = password,
                RePassword = repassword
            });

            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.Password.ERROR_PASSWORD_DO_NOT_MATCH));
        }

        [TestMethod]
        public void IsValid_should_not_return_any_password_errorcode_when_password_isvalid()
        {
            var mockobject = new Mock<IUserData>();
            mockobject.Setup(x => x.GetEmailAddress(string.Empty)).Returns(string.Empty);
            RegistrationValidator validator = new RegistrationValidator(mockobject.Object);
            validator.IsValid(new UserDataObject
            {
                Password = "Some12k",
                RePassword = "Some12k"
            });

            Assert.IsFalse(validator.ErrorCodes.Contains(ErrorCodes.Password.ERROR_PASSWORD_STRENGTH));
            Assert.IsFalse(validator.ErrorCodes.Contains(ErrorCodes.Password.ERROR_PASSWORD_DO_NOT_MATCH));
            Assert.IsFalse(validator.ErrorCodes.Contains(ErrorCodes.Password.ERROR_PASSWORD_REQUIRED));            
            Assert.IsFalse(validator.ErrorCodes.Contains(ErrorCodes.Password.ERROR_REPASSWORD_REQUIRED));
        }

        [DataTestMethod]
        [DataRow("jeetehndradv")]
        [DataRow("jeetehndradv@some")]
        [DataRow("jeetehndradv@some.")]
        public void IsValid_should_return_invalid_email_errorcode_when_invalid_email_ispassed(string email)
        {
            var mockobject = new Mock<IUserData>();
            mockobject.Setup(x => x.GetEmailAddress(string.Empty)).Returns(string.Empty);
            RegistrationValidator validator = new RegistrationValidator(mockobject.Object);
            validator.IsValid(new UserDataObject
            {
                Email = email
            });

            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.Registration.ERROR_EMAIL_INVALID));
        }

        [TestMethod]
        public void IsValid_should_return_email_registered_errorcode_when_registered_email_ispassed()
        {
            string email = "jeethendradv@IMS.co.nz";
            var mockobject = new Mock<IUserData>();
            mockobject.Setup(x => x.GetEmailAddress(email)).Returns(email);
            RegistrationValidator validator = new RegistrationValidator(mockobject.Object);
            validator.IsValid(new UserDataObject
            {
                Email = email
            });

            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.Registration.ERROR_EMAIL_IS_REGISTERED));
        }

        [DataTestMethod]
        [DataRow("12345")]
        [DataRow("somephonenumber")]
        [DataRow("+204117036")]
        [DataRow("+64-20-41170361")]
        public void IsValid_should_return_invalid_phone_errorcode_when_phonenumber_is_invalid(string phone)
        {
            var mockobject = new Mock<IUserData>();
            mockobject.Setup(x => x.GetEmailAddress(string.Empty)).Returns(string.Empty);
            RegistrationValidator validator = new RegistrationValidator(mockobject.Object);
            validator.IsValid(new UserDataObject
            {
                Phone = phone
            });

            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.Registration.ERROR_PHONE_INVALID));
        }

        [DataTestMethod]
        [DataRow("02041170361")]
        [DataRow("+642041170361")]
        [DataRow("+64 20 4117 0361")]
        public void IsValid_should_not_return_any_phone_errorcodes_when_phonenumber_isvalid(string phone)
        {
            var mockobject = new Mock<IUserData>();
            mockobject.Setup(x => x.GetEmailAddress(string.Empty)).Returns(string.Empty);
            RegistrationValidator validator = new RegistrationValidator(mockobject.Object);
            validator.IsValid(new UserDataObject
            {
                Phone = phone
            });

            Assert.IsFalse(validator.ErrorCodes.Contains(ErrorCodes.Registration.ERROR_PHONE_INVALID));
        }

        [TestMethod]
        public void IsValid_should_return_true_when_user_information_isvalid()
        {
            UserDataObject user = new UserDataObject
            {
                FirstName = "Jeethendra",
                LastName = "dv",
                Password = "Some12",
                RePassword = "Some12",
                Company = "IMS Group",
                Phone = "02041170361",
                Email = "jeethendra@IMS.co.nz"
            };
            var mockobject = new Mock<IUserData>();
            mockobject.Setup(x => x.GetEmailAddress(user.Email)).Returns(string.Empty);
            RegistrationValidator validator = new RegistrationValidator(mockobject.Object);
            Assert.IsTrue(validator.IsValid(user));
            Assert.AreEqual(0, validator.ErrorCodes.Count);
        }
    }
}
