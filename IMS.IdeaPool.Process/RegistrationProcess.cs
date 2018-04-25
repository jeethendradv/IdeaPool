using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Exceptions;
using IMS.IdeaPool.Process.Interfaces;
using IMS.IdeaPool.Process.Validators;

namespace IMS.IdeaPool.Process
{
    internal class RegistrationProcess : IRegistrationProcess
    {
        private IUserData userData;

        public RegistrationProcess(IUserData userData)
        {
            this.userData = userData;
        }

        public bool IsRegisteredEmailAddress(string email)
        {
            string userEmail = userData.GetEmailAddress(email);
            return !string.IsNullOrEmpty(userEmail);
        }

        public int Register(UserDataObject user)
        {
            RegistrationValidator validator = new RegistrationValidator(userData);
            if (!validator.IsValid(user))
            {
                throw new RegistrationException(validator.ErrorCodes);
            }
            user.EncryptedPassword = IGenProtector.Encrypt(user.Password);
            return userData.Add(user);
        }
    }
}
