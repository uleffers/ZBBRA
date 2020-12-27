using System.Collections.Generic;

namespace ZBBRA.Business.Models
{
    public class CashflowOverviewModel
    {
        /// <summary>
        /// Total income in month
        /// </summary>
        public decimal IncomeTotal { get; set; }
        
        /// <summary>
        /// Total expense in month
        /// </summary>
        public decimal ExpenseTotal { get; set; }
        
        /// <summary>
        /// Cashflow for each category 
        /// </summary>
        public List<KeyValuePair<string, decimal>> CashflowCategories = new List<KeyValuePair<string, decimal>>();
        
        /// <summary>
        /// Cashflow for each category group
        /// </summary>
        public List<KeyValuePair<string, decimal>> CashflowGroups = new List<KeyValuePair<string, decimal>>();
        
        /// <summary>
        /// Balance history for each account
        /// </summary>
        public List<BalanceHistoryModel> BalanceHistoryModels = new List<BalanceHistoryModel>();
    }
}