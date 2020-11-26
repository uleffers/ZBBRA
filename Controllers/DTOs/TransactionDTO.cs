using System;

namespace ZBBRA.Controllers.DTOs
{
    /// <summary>
    /// DTO for showing or updating transactions
    /// </summary>
    public class TransactionDTO
    {
        /// <summary>
        /// Transaction ID
        /// </summary>
        public Guid TransactionId { get; set; }

        /// <summary>
        /// Date of the transaction
        /// </summary>
        public DateTime TransactionDate { get; set; }

        /// <summary>
        /// Transaction amount
        /// </summary>
        public decimal TransactionAmount { get; set;  }

        /// <summary>
        /// Note on the transaction
        /// </summary>
        public string TransactionNote { get; set; }

        /// <summary>
        /// Corresponding Budget Category
        /// </summary>
        public Guid? BudgetCategoryId { get; set; }

        /// <summary>
        /// Account from which the transaction is made
        /// </summary>
        public Guid AccountId { get; set; }
    }
}