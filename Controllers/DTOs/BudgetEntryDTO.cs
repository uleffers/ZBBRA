using System;

namespace ZBBRA.Controllers.DTOs
{
    /// <summary>
    /// Budget entry DTO
    /// </summary>
    public class BudgetEntryDTO
    {
        /// <summary>
        /// EntryId
        /// </summary>
        public Guid BudgetEntryId { get; set; }

        /// <summary>
        /// Entry amount
        /// </summary>
        public decimal BudgetEntryAmount { get; set; }
    }
}