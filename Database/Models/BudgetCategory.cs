using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.Models
{
    /// <summary>
    /// Budget category
    /// </summary>
    [Table("BudgetCategory")]
    public class BudgetCategory
    {
        public BudgetCategory()
        {
            Transactions = new HashSet<Transaction>();
            BudgetEntries = new HashSet<BudgetEntry>();
        }
        /// <summary>
        /// Category ID
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid BudgetCategoryId { get; set; }
        
        /// <summary>
        /// Category Name
        /// </summary>
        public string CategoryName { get; set; }

        /// <summary>
        /// Index used to defined the sorting
        /// </summary>
        public int CategoryIndex { get; set; }

        /// <summary>
        /// Default amount
        /// </summary>
        public decimal DefaultAmount { get; set; }
        
        /// <summary>
        /// Category group
        /// </summary>
        [ForeignKey("CategoryGroup")]
        public Guid CategoryGroupId { get; set;  }

        public virtual CategoryGroup CategoryGroup { get; set; }

        /// <summary>
        /// Transactions within the category
        /// </summary>
        public virtual ICollection<Transaction> Transactions { get; set; }
        
        /// <summary>
        /// Budget entries related to this category
        /// </summary>
        public virtual ICollection<BudgetEntry> BudgetEntries { get; set; }
    }
}