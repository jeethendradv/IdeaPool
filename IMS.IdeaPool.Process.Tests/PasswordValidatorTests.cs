using IMS.IdeaPool.Process.Validators;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace IMS.IdeaPool.Process.Tests
{
    public class PasswordValidatorTests
    {
        [TestMethod]
        public void IsValid_Returns_validCode_when_Required_fields_are_Empty()
        {
            PasswordValidator validator = new PasswordValidator();
            validator.IsValid("", "");
            
            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.Password.ERROR_PASSWORD_REQUIRED));            
            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.Password.ERROR_REPASSWORD_REQUIRED));
        }

        [TestMethod]
        public void IsValid_should_return_password_invalid_errorcode_when_password_isbelow_6_characters()
        {
            PasswordValidator validator = new PasswordValidator();
            validator.IsValid("some", "some");

            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.Password.ERROR_PASSWORD_STRENGTH));
        }

        [TestMethod]
        public void IsValid_should_return_password_invalid_errorcode_when_password_isabove_10_characters()
        {
            PasswordValidator validator = new PasswordValidator();
            validator.IsValid("somesome", "somesome");

            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.Password.ERROR_PASSWORD_STRENGTH));
        }

        [DataTestMethod]
        [DataRow("Some12", "")]
        [DataRow("Some12", "some12")]
        public void Isvalid_should_return_password_donotmatch_errorcode_when_passwords_are_different(string password, string repassword)
        {
            PasswordValidator validator = new PasswordValidator();
            validator.IsValid("Some12", "Some13");

            Assert.IsTrue(validator.ErrorCodes.Contains(ErrorCodes.Password.ERROR_PASSWORD_DO_NOT_MATCH));
        }

        [TestMethod]
        public void IsValid_should_not_return_any_password_errorcode_when_password_isvalid()
        {
            PasswordValidator validator = new PasswordValidator();
            validator.IsValid("Some12", "Some12");

            Assert.IsFalse(validator.ErrorCodes.Contains(ErrorCodes.Password.ERROR_PASSWORD_STRENGTH));
            Assert.IsFalse(validator.ErrorCodes.Contains(ErrorCodes.Password.ERROR_PASSWORD_DO_NOT_MATCH));
            Assert.IsFalse(validator.ErrorCodes.Contains(ErrorCodes.Password.ERROR_PASSWORD_REQUIRED));
            Assert.IsFalse(validator.ErrorCodes.Contains(ErrorCodes.Password.ERROR_REPASSWORD_REQUIRED));
        }
    }
}
