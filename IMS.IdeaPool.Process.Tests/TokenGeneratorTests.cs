using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace IMS.IdeaPool.Process.Tests
{
    [TestClass]
    public class TokenGeneratorTests
    {
        [TestMethod]
        public void Get_should_return_token_of_10_characters()
        {
            string token = TokenGenerator.Get();
            Assert.AreEqual(10, token.Length);
        }
    }
}
