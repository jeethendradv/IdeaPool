using System;

namespace IMS.IdeaPool.DataObjects
{
    public class ForgotPasswordTokenObject
    {
        public string Token { get; set; }
        public DateTime ExpiryDateTime { get; set; }
        public int UserId { get; set; }

        public bool HasExpired()
        {
            return DateTime.UtcNow > ExpiryDateTime;
        }
    }
}
