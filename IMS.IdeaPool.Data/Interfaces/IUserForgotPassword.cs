using IMS.IdeaPool.DataObjects;

namespace IMS.IdeaPool.Data.Interfaces
{
    public interface IUserForgotPassword
    {
        void InsertOrUpdate(int userId, string token);
        void ResetPassword(string token, string password);
        void ResetPassword(int userId, string password);
        ForgotPasswordTokenObject Get(string token);
        void Delete(string token);        
    }
}
