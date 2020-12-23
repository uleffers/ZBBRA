using System.Collections.Generic;

namespace ZBBRA.Controllers.DTOs
{
    public class CashflowOverviewDTO
    {
        public decimal IncomeTotal { get; set; }
        public decimal ExpenseTotal { get; set; }
        public List<CashflowCategoryDTO> CashflowCategories { get; set; } = new List<CashflowCategoryDTO>();
    }
}