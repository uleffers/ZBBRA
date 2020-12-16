using System;

namespace ZBBRA.Controllers.DTOs
{
    public class BudgetEntrySpentDTO
    {
        /// <summary>
        /// EntryId
        /// </summary>
        public Guid? BudgetEntryId { get; set; }

        /// <summary>
        /// Entry amount
        /// </summary>
        public decimal BudgetEntryAmount { get; set; }

        /// <summary>
        /// Sum of all transaction in the given budget category
        /// </summary>
        public decimal TransactionSum { get; set; }
        
        /// <summary>
        /// Remaining (i.e. BudgetEntryAmount + PreviousBudgetEntrySum - TransactionSum)
        /// </summary>
        public decimal Remaining { get; set; }

        /// <summary>
        /// Sum of all previous budget entries
        /// </summary>
        public decimal PreviousBudgetEntrySum { get; set; }

        /// <summary>
        /// Category name
        /// </summary>
        public string BudgetCategoryName { get; set; }

        /// <summary>
        /// Id of the budget category
        /// </summary>
        public Guid BudgetCategoryId { get; set; }
    }
}