using IMS.IdeaPool.DataObjects;

namespace IMS.IdeaPool.Process.Interfaces
{
    public interface IForgotPasswordProcess
    {
        string GetForgotPasswordToken(string email);
        ForgotPasswordTokenObject Get(string token);
        void ResetPassword(string token, string password, string repassword);
        void ResetPassword(int userId, string password, string repassword);
        bool IsValidPasswordToken(string token);
        void DeletePasswordToken(string token);
    }
}
