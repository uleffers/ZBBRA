using System;
using Database.Models;

namespace ZBBRA.Business.Models
{
    public class BudgetEntrySpentModel
    {
        public BudgetEntry BudgetEntry { get; set; }

        /// <summary>
        /// Budget category
        /// </summary>
        public BudgetCategory BudgetCategory { get; set; }

        /// <summary>
        /// Sum of all transaction in the given budget category
        /// </summary>
        public decimal TransactionSum { get; set; }

        /// <summary>
        /// Sum of all previous budget entries
        /// </summary>
        public decimal PreviousBudgetEntrySum { get; set; }
    }
}