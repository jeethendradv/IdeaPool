using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace IMS.IdeaPool.Process.Tests
{
    [TestClass]
    public class IGenProtectorTests
    {
        [TestMethod]
        public void ValidatePasswordProtector()
        {
            string password = "password";
            string encryptedpassword = IGenProtector.Encrypt(password);
            string decryptedPassword = IGenProtector.Decrypt(encryptedpassword);

            Assert.AreEqual(password, decryptedPassword);
        }
    }
}
