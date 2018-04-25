using System.Collections.Generic;
using System.Text.RegularExpressions;
using ErrorConstants = IMS.IdeaPool.Process.ErrorCodes;

namespace IMS.IdeaPool.Process.Validators
{
    internal class PasswordValidator
    {
        private List<int> errorcodes = new List<int>();
        public List<int> ErrorCodes
        {
            get
            {
                return errorcodes;
            }
        }

        public bool IsValid(string password, string repassword)
        {
            validatePassword(password, repassword);
            return ErrorCodes.Count == 0;
        }

        private void validatePassword(string password, string repassword)
        {
            bool passwordEmpty = string.IsNullOrEmpty(password);
            if (passwordEmpty)
            {
                errorcodes.Add(ErrorConstants.Password.ERROR_PASSWORD_REQUIRED);
            }
            bool repasswordEmpty = string.IsNullOrEmpty(repassword);
            if (repasswordEmpty)
            {
                errorcodes.Add(ErrorConstants.Password.ERROR_REPASSWORD_REQUIRED);
            }
            bool isPasswordNotEmptyAndMatch = (!passwordEmpty && !repasswordEmpty) && (password == repassword);
            if (!isPasswordNotEmptyAndMatch)
            {
                errorcodes.Add(ErrorConstants.Password.ERROR_PASSWORD_DO_NOT_MATCH);
            }
            else if (!isValidPasswordStrength(password))
            {
                errorcodes.Add(ErrorConstants.Password.ERROR_PASSWORD_STRENGTH);
            }
        }

        private bool isValidPasswordStrength(string password)
        {
            Regex regex = new Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{2})[a-zA-Z\d]{6,10}$");
            return regex.IsMatch(password);
        }
    }
}
