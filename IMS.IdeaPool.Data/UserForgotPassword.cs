using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using System;
using System.Linq;

namespace IMS.IdeaPool.Data
{
    internal class UserForgotPassword : IUserForgotPassword
    {
        public void InsertOrUpdate(int userId, string token)
        {
            using (var context = new IdeaPoolEntities())
            {
                ForgotPassword forgotpassword = context.ForgotPasswords.SingleOrDefault(x => x.UserId == userId);
                if (forgotpassword == null)
                {
                    context.ForgotPasswords.Add(new ForgotPassword
                    {
                        UserId = userId,
                        Token = token,
                        ExpiryDateTime = DateTime.UtcNow.AddDays(1)
                    });
                }
                else
                {
                    forgotpassword.Token = token;
                    forgotpassword.ExpiryDateTime = DateTime.UtcNow.AddDays(1);
                    context.Entry(forgotpassword).State = System.Data.Entity.EntityState.Modified;
                }
                context.SaveChanges();
            }
        }

        public ForgotPasswordTokenObject Get(string token)
        {
            ForgotPasswordTokenObject passwordToken = null;
            using (var context = new IdeaPoolEntities())
            {
                ForgotPassword forgotPassword = context.ForgotPasswords.SingleOrDefault(x => x.Token == token);
                if (forgotPassword != null)
                {
                    passwordToken = new ForgotPasswordTokenObject
                    {
                        Token = forgotPassword.Token,
                        ExpiryDateTime = forgotPassword.ExpiryDateTime,
                        UserId = forgotPassword.UserId
                    };
                }
            }
            return passwordToken;
        }

        public void ResetPassword(string token, string password)
        {
            using (var context = new IdeaPoolEntities())
            {
                Login login = context.ForgotPasswords.Where(x => x.Token == token).Select(x => x.User.Login).Single();
                login.Password = password;
                context.Entry(login).State = System.Data.Entity.EntityState.Modified;
                context.SaveChanges();
            }
        }

        public void ResetPassword(int userId, string password)
        {
            using (var context = new IdeaPoolEntities())
            {
                Login login = context.Logins.Where(x => x.UserId == userId).Single();
                login.Password = password;
                context.Entry(login).State = System.Data.Entity.EntityState.Modified;
                context.SaveChanges();
            }
        }

        public void Delete(string token)
        {
            using (var context = new IdeaPoolEntities())
            {
                ForgotPassword passwordtoken = context.ForgotPasswords.SingleOrDefault(x => x.Token == token);
                if (passwordtoken != null)
                {
                    context.Entry(passwordtoken).State = System.Data.Entity.EntityState.Deleted;
                    context.SaveChanges();
                }
            }
        }
    }
}
