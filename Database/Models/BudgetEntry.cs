using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.Models
{
    [Table("BudgetEntry")]
    public class BudgetEntry
    {
        public Guid BudgetEntryId { get; set; }

        public int Month { get; set; }

        public int Year { get; set; }

        public decimal BudgetEntryAmount { get; set; }

        [ForeignKey("BudgetCategory")]
        public Guid BudgetCategoryId { get; set; }

        public virtual BudgetCategory BudgetCategory { get; set; }
    }
}