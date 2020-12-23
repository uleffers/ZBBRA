using System.Collections.Generic;

namespace ZBBRA.Business.Models
{
    public class CashflowOverviewModel
    {
        public decimal IncomeTotal { get; set; }
        public decimal ExpenseTotal { get; set; }
        public List<KeyValuePair<string, decimal>> CashflowCategories = new List<KeyValuePair<string, decimal>>();
    }
}