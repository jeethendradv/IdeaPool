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
    
    public partial class IdeaHistory
    {
        public int Id { get; set; }
        public int IdeaId { get; set; }
        public int UserId { get; set; }
        public int ActivityId { get; set; }
        public string Description { get; set; }
        public System.DateTime CreateDate { get; set; }
    
        public virtual Activity Activity { get; set; }
        public virtual Idea Idea { get; set; }
        public virtual User User { get; set; }
    }
}
