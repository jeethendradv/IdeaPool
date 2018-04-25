using System.Collections.Generic;

namespace IMS.IdeaPool.DataObjects
{
    public class UserDataObject : UserBase
    {       
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool IsSubscriptionEnabled { get; set; }
        public bool IsActive { get; set; }
        public string Password { get; set; }
        public string RePassword { get; set; }
        public string EncryptedPassword { get; set; }
        public bool IsAccountActivated { get; set; }
        public bool IsOwnerOrReviewer { get; set; }
        public List<string> FeatureAccess { get; set; }
        public List<KeyValueDataObject> Roles { get; set; }
    }
}