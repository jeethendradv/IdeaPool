using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Reflection;
using System.Resources;

namespace IMS.IdeaPool.Process
{
    internal class ErrorProcess : IErrorProcess
    {
        public List<ErrorCode> GetAllErrorCodes()
        {
            List<ErrorCode> errorCodes = new List<ErrorCode>();
            ResourceManager resource = new ResourceManager("IMS.IdeaPool.Process.ErrorMessages", Assembly.GetExecutingAssembly());
            ResourceSet resourceSet = resource.GetResourceSet(CultureInfo.CurrentUICulture, true, true);            
            foreach (DictionaryEntry entry in resourceSet)
            {
                errorCodes.Add(new ErrorCode
                {
                    Code = Convert.ToInt32(entry.Key),
                    Message = entry.Value.ToString()
                });
            }
            return errorCodes;
        }
    }
}
