using Errors = IMS.IdeaPool.Process.ErrorCodes;

namespace IMS.IdeaPool.Process.Exceptions
{
    public class AccountNotActivatedException : BusinessException
    {
        public AccountNotActivatedException()
        {
            ErrorCodes.Add(Errors.Login.ERROR_ACCOUNT_NOT_ACTIVATED);
        }
    }
}
