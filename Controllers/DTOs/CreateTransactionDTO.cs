﻿using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ZBBRA.Controllers.DTOs
{
    /// <summary>
    /// DTO for Transactions
    /// </summary>
    public class CreateTransactionDTO
    {
        /// <summary>
        /// Date of the transaction
        /// </summary>
        public DateTime TransactionDate { get; set; }

        /// <summary>
        /// Income
        /// </summary>
        public decimal IncomeAmount { get; set;  }
        
        /// <summary>
        /// Expense
        /// </summary>
        public decimal ExpenseAmount { get; set;  }

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