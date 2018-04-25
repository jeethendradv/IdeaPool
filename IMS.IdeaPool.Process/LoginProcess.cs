using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Exceptions;
using IMS.IdeaPool.Process.Interfaces;
using System.Collections.Generic;

namespace IMS.IdeaPool.Process
{
    internal class LoginProcess : ILoginProcess
    {
        private IUserData userData;
        private IUserForgotPassword userForgotPassword;

        public LoginProcess(IUserData userData, IUserForgotPassword userForgotPassword)
        {
            this.userData = userData;
            this.userForgotPassword = userForgotPassword;
        }

        public UserDataObject Authenticate(string email, string password)
        {
            if (isEmpty(email, password))
            {
                throw new UserNameAndPasswordRequiredException(new List<int> {
                    ErrorCodes.Login.ERROR_EMAIL_REQUIRED,
                    ErrorCodes.Login.ERROR_PASSWORD_REQUIRED
                });
            }
            
            UserDataObject userDataObject = userData.Get(email);
            if (userDataObject == null)
            {
                throw new InvalidCredentialsException(ErrorCodes.Login.ERROR_INVALID_CREDENTIALS);
            }
            else if (!userDataObject.IsAccountActivated)
            {
                throw new AccountNotActivatedException();
            }
            else if (!userDataObject.IsActive || !isValidPassword(userDataObject, password))
            {
                throw new InvalidCredentialsException(ErrorCodes.Login.ERROR_INVALID_CREDENTIALS);
            }
            userData.UpdateLoginDateTime(userDataObject.Id);
            return userDataObject;
        }

        public bool Activate(string email)
        {
            return userData.Activate(email);
        }
        
        private bool isValidPassword(UserDataObject userObject, string password)
        {
            return IGenProtector.Decrypt(userObject.EncryptedPassword) == password;
        }

        private bool isEmpty(string username,string password)
        {
            bool isEmpty = false;
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                isEmpty = true;
            }
            return isEmpty;
        }
    }
}
