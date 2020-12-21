using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.Models
{
    [Table(name: "Account")]
    public class Account
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid AccountId { get; set; }
        
        public string AccountName { get; set; }

        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();

        public bool TrackingAccount { get; set; }
    }
}