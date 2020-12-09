using System.Collections.Generic;
using System.Threading.Tasks;
using Database.Models;
using ZBBRA.Business.Models;

namespace ZBBRA.Business.Interfaces
{
    public interface IBudgetManager
    {
        Task AddBudgetEntry(BudgetEntry budgetEntry);
        Task UpdateBudgetEntry(BudgetEntry budgetEntry);
        Task<List<BudgetGroupModel>> GetBudgetForMonth(int month, int year);
    }
}