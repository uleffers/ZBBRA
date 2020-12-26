using System.Collections.Generic;

namespace ZBBRA.Controllers.DTOs
{
    public class BudgetViewCategoryGroupDTO
    {
        /// <summary>
        /// Name of the Category Group
        /// </summary>
        public string CategoryGroupName { get; set; }
        
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
        /// Entries in the group
        /// </summary>
        public List<BudgetViewCategoryDTO> BudgetEntrySpentDTOs { get; set; } = new List<BudgetViewCategoryDTO>();
    }
}