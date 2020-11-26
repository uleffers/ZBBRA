using System;

namespace ZBBRA.Controllers.DTOs
{
    /// <summary>
    /// BudgetCategoryDTO - used when creating new transaction
    /// </summary>
    public class BudgetCategoryDTO
    {
        /// <summary>
        /// Category ID
        /// </summary>
        public Guid BudgetCategoryId { get; set; }
        /// <summary>
        /// Category Name
        /// </summary>
        public string CategoryName { get; set; }
    }
}