using System;

namespace ZBBRA.Controllers.DTOs
{
    /// <summary>
    /// Budget entry DTO for creation
    /// </summary>
    public class CreateBudgetEntryDTO
    {
        /// <summary>
        /// Entry month
        /// </summary>
        public int Month { get; set; }

        /// <summary>
        /// Entry year
        /// </summary>
        public int Year { get; set; }

        /// <summary>
        /// Entry amount
        /// </summary>
        public decimal BudgetEntryAmount { get; set; }

        /// <summary>
        /// Category id
        /// </summary>
        public Guid BudgetCategoryId { get; set; }
    }
}