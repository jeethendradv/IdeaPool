//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace IMS.IdeaPool.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class Exception
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string CallStack { get; set; }
        public Nullable<int> UserId { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public string UserAgent { get; set; }
        public string ExceptionType { get; set; }
    
        public virtual User User { get; set; }
    }
}
