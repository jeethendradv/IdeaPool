using IMS.IdeaPool.DataObjects;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using ErrorConstants = IMS.IdeaPool.Process.ErrorCodes;

namespace IMS.IdeaPool.Process.Validators
{
    public class ProfileValidator
    {
        protected List<int> errorcodes = new List<int>();
        public virtual List<int> ErrorCodes
        {
            get
            {
                return errorcodes;
            }
        }

        public virtual bool IsValid(UserDataObject user)
        {
            if (string.IsNullOrEmpty(user.FirstName))
            {
                errorcodes.Add(ErrorConstants.Registration.ERROR_FIRSTNAME_REQUIRED);
            }
            if (string.IsNullOrEmpty(user.LastName))
            {
                errorcodes.Add(ErrorConstants.Registration.ERROR_LASTNAME_REQUIRED);
            }            
            if (string.IsNullOrEmpty(user.Company))
            {
                errorcodes.Add(ErrorConstants.Registration.ERROR_COMPANY_REQUIRED);
            }
            ValidatePhone(user.Phone);
            return ErrorCodes.Count == 0;
        }

        protected void ValidatePhone(string phone)
        {
            bool isEmpty = string.IsNullOrEmpty(phone);
            if (isEmpty)
            {
                errorcodes.Add(ErrorConstants.Registration.ERROR_PHONE_REQUIRED);
            }
            if (!isEmpty && !IsValidPhoneNumber(phone))
            {
                errorcodes.Add(ErrorConstants.Registration.ERROR_PHONE_INVALID);
            }
        }

        private bool IsValidPhoneNumber(string phone)
        {
            Regex regex = new Regex(@"^[ ()+]*([0-9][ ()+]*){10,}$");
            return regex.IsMatch(phone);
        }
    }
}
