using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Database.Models;
using ZBBRA.Business.Models;

namespace ZBBRA.Business.Interfaces
{
    public interface IBudgetManager
    {
        Task AddBudgetEntry(BudgetEntry budgetEntry);
        Task UpdateBudgetEntry(Guid budgetEntryId, decimal budgetEntryAmount);
        Task<List<BudgetViewCategoryGroupModel>> GetBudgetForMonth(int month, int year);
        Task InitializeBudgetMonth(int month, int year);
        Task<BudgetOverviewModel> GetBudgetOverviewForMonth(int month, int year);
    }
}