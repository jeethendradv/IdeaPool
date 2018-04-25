using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using ErrorConstants = IMS.IdeaPool.Process.ErrorCodes;

namespace IMS.IdeaPool.Process.Validators
{
    internal class RegistrationValidator : ProfileValidator
    {
        private IUserData userData;
        public RegistrationValidator(IUserData userData)
        {
            this.userData = userData;
        }
        
        public override List<int> ErrorCodes
        {
            get
            {
                return errorcodes;
            }
        }

        public override bool IsValid(UserDataObject user)
        {
            base.IsValid(user);
            PasswordValidator password = new PasswordValidator();
            if (!password.IsValid(user.Password, user.RePassword))
            {
                errorcodes.AddRange(password.ErrorCodes);
            }

            ValidateEmail(user.Email);            
            return ErrorCodes.Count == 0;
        }

        private void ValidateEmail(string email)
        {
            bool isEmpty = string.IsNullOrEmpty(email);
            if (isEmpty)
            {
                errorcodes.Add(ErrorConstants.Registration.ERROR_EMAIL_REQUIRED);
            }
            bool isValidemail = !isEmpty && IsValidEmail(email);
            if (!isValidemail)
            {
                errorcodes.Add(ErrorConstants.Registration.ERROR_EMAIL_INVALID);
            }
            if (!isEmpty && isValidemail && IsRegisteredEmail(email))
            {
                errorcodes.Add(ErrorConstants.Registration.ERROR_EMAIL_IS_REGISTERED);
            }
        }

        private bool IsValidEmail(string email)
        {
            string emailValidRegex = @"\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*";
            Regex regex = new Regex(emailValidRegex);
            return regex.IsMatch(email);
        }

        private bool IsRegisteredEmail(string email)
        {
            return !string.IsNullOrEmpty(userData.GetEmailAddress(email));
        }
    }
}
