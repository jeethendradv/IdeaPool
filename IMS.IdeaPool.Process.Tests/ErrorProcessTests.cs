using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Interfaces;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;

namespace IMS.IdeaPool.Process.Tests
{
    [TestClass]
    public class ErrorProcessTests
    {
        [TestMethod]
        public void GetAllErrorMessages_returns_list_of_all_errorcodes()
        {
            IErrorProcess process = ProcessFactory.GetErrorProcess();
            List<ErrorCode> errorMessages = process.GetAllErrorCodes();
            Assert.AreEqual(37, errorMessages.Count);
        }
    }
}
