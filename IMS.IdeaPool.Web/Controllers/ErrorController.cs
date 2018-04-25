using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process;
using IMS.IdeaPool.Web.Helpers;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace IMS.IdeaPool.Web.Controllers
{
    public class ErrorController : Controller
    {
        public JsonResult Load()
        {
            List<ErrorCode> errorCodes = ProcessFactory.GetErrorProcess().GetAllErrorCodes();
            return Json(errorCodes, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateInput(false)]
        public void LogException(string message, string callstack)
        {
            ExceptionDataObject exceptionObject = new ExceptionDataObject
            {
                Message = message,
                CallStack = callstack,
                ExceptionType = "JavaScript",
                UserAgent = Request.UserAgent,
                UserId = (int?)Session[SessionKeys.USER_ID]
            };
            ProcessFactory.GetExceptionProcess().Insert(exceptionObject);
        }
    }
}