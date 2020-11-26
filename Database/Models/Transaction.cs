using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.Models
{
    [Table(name: "Transaction")]
    public class Transaction
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid TransactionId { get; set; }
        
        public DateTime TransactionDate { get; set; }

        public decimal TransactionAmount { get; set;  }

        public string TransactionNote { get; set; }

        [ForeignKey("BudgetCategory")]
        public Guid? BudgetCategoryId { get; set; }
        
        [ForeignKey("Account")]
        public Guid AccountId { get; set; }

        public virtual Account Account { get; set; }
        
        #nullable enable
        public virtual BudgetCategory? BudgetCategory { get; set; }
        #nullable disable

    }
}