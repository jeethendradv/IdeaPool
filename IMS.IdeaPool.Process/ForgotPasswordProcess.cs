using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Exceptions;
using IMS.IdeaPool.Process.Interfaces;
using IMS.IdeaPool.Process.Validators;

namespace IMS.IdeaPool.Process
{
    internal class ForgotPasswordProcess : IForgotPasswordProcess
    {
        private IUserForgotPassword userForgotPassword;
        private IUserData userData;
        public ForgotPasswordProcess(IUserData userData, IUserForgotPassword userForgotPassword)
        {
            this.userData = userData;
            this.userForgotPassword = userForgotPassword;
        }

        public void DeletePasswordToken(string token)
        {
            userForgotPassword.Delete(token);
        }

        public string GetForgotPasswordToken(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                throw new RequiredFieldException(ErrorCodes.ForgotPassword.ERROR_EMAIL_REQUIRED);
            }
            string token = string.Empty;
            UserDataObject user = userData.Get(email);
            if (user != null)
            {
                token = TokenGenerator.Get();
                userForgotPassword.InsertOrUpdate(user.Id, token);
            }
            return token;
        }

        public bool IsValidPasswordToken(string token)
        {
            ForgotPasswordTokenObject passwordToken = userForgotPassword.Get(token);
            return passwordToken != null && !passwordToken.HasExpired();
        }

        public ForgotPasswordTokenObject Get(string token)
        {
            return userForgotPassword.Get(token);
        }

        public void ResetPassword(string token, string password, string repassword)
        {
            if (!IsValidPasswordToken(token))
            {
                throw new PasswordTokenExpiredException();
            }

            PasswordValidator passwordValidator = new PasswordValidator();
            if (!passwordValidator.IsValid(password, repassword))
            {
                throw new FormException(passwordValidator.ErrorCodes);
            }
            string encryptedPassword = IGenProtector.Encrypt(password);
            userForgotPassword.ResetPassword(token, encryptedPassword);
        }

        public void ResetPassword(int userId, string password, string repassword)
        {
            PasswordValidator passwordValidator = new PasswordValidator();
            if (!passwordValidator.IsValid(password, repassword))
            {
                throw new FormException(passwordValidator.ErrorCodes);
            }
            if (userId == 0)
            {
                throw new UnAuthorizedException();
            }
            string encryptedPassword = IGenProtector.Encrypt(password);
            userForgotPassword.ResetPassword(userId, encryptedPassword);
        }
    }
}
