using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Database.Context;
using Database.Models;
using ZBBRA.Business.Interfaces;
using ZBBRA.Business.Models;

namespace ZBBRA.Business
{
    /// <summary>
    /// Budget manager
    /// </summary>
    public class BudgetManager : IBudgetManager
    {
        private readonly ZbbraDBContext _context;

        public BudgetManager(ZbbraDBContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Add budget entry
        /// </summary>
        /// <param name="budgetEntry"></param>
        /// <returns></returns>
        public async Task AddBudgetEntry(BudgetEntry budgetEntry)
        {
            await _context.BudgetEntry.AddAsync(budgetEntry);
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Update budget entry
        /// </summary>
        /// <param name="budgetEntryId"></param>
        /// <param name="budgetEntryAmount"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task UpdateBudgetEntry(Guid budgetEntryId, decimal budgetEntryAmount)
        {
            if (budgetEntryId == Guid.Empty)
            {
                throw new HttpRequestException("Invalid BudgetEntryId");
            }

            var persistedEntry =
                await _context.BudgetEntry.FirstOrDefaultAsync(x => x.BudgetEntryId == budgetEntryId);
            
            if (persistedEntry == null)
            {
                throw new HttpRequestException("Budget entry does not exist");
            }

            persistedEntry.BudgetEntryAmount = budgetEntryAmount;

            await _context.SaveChangesAsync();

        }

        /// <summary>
        /// Retrieves the budget for a given month
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        /// <exception cref="HttpRequestException"></exception>
        public async Task<List<BudgetViewCategoryGroupModel>> GetBudgetForMonth(int month, int year)
        {
            ManagerHelper.VerifyMonthAndYear(month, year);
            var nextMonth = ManagerHelper.GetNextMonth(month, year);
            var thisMonth = ManagerHelper.GetThisMonth(month, year);
            
            var budgetEntrySpent = await _context.BudgetCategory
                .Select(x => new BudgetViewCategoryModel
                {
                    BudgetEntry = x.BudgetEntries.FirstOrDefault(be => be.Month == month && be.Year == year) ?? new BudgetEntry()
                    {
                        BudgetEntryAmount = 0,
                        BudgetCategoryId = x.BudgetCategoryId,
                        Month = month,
                        Year = year,
                    },
                    BudgetCategory = new BudgetCategory()
                    {
                        BudgetCategoryId = x.BudgetCategoryId,
                        CategoryName = x.CategoryName,
                        CategoryGroup = new CategoryGroup()
                        {
                            CategoryGroupId = x.CategoryGroupId,
                            CategoryGroupIndex = x.CategoryGroup.CategoryGroupIndex,
                            CategoryGroupName = x.CategoryGroup.CategoryGroupName,
                        },
                        CategoryGroupId = x.CategoryGroupId,
                        CategoryIndex = x.CategoryIndex,
                        DefaultAmount = x.DefaultAmount
                    },
                    TransactionSum = x.Transactions
                        .Where(t => t.TransactionDate < nextMonth && t.TransactionDate >= thisMonth && !t.Account.TrackingAccount)
                        .Sum(t => t.ExpenseAmount - t.IncomeAmount),
                    PreviousBudgetEntrySum = (x.BudgetEntries
                        .Where(be => (be.Month < month && be.Year == year) || (be.Year < year))
                        .Sum(be => be.BudgetEntryAmount)
                    - x.Transactions.Where(t => t.TransactionDate < thisMonth && !t.Account.TrackingAccount)
                        .Sum(t => t.ExpenseAmount - t.IncomeAmount))
                })
                .ToListAsync();

            var entriesGrouped = budgetEntrySpent
                .GroupBy(x => x.BudgetCategory.CategoryGroupId)
                .OrderBy(x => x.First().BudgetCategory.CategoryGroup.CategoryGroupIndex);

            var entriesInGroups = new List<BudgetViewCategoryGroupModel>();

            foreach (var group in entriesGrouped)
            {
                var name = group.First().BudgetCategory?.CategoryGroup?.CategoryGroupName;
                entriesInGroups.Add(new BudgetViewCategoryGroupModel()
                {
                    CategoryGroupName = name,
                    BudgetEntrySpentModels = group.OrderBy(x => x.BudgetCategory.CategoryIndex).ToList()
                });
            }
            
            return entriesInGroups;
        }

        /// <summary>
        /// Retrieves the budget for a given month
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        /// <exception cref="HttpRequestException"></exception>
        public async Task<BudgetOverviewModel> GetBudgetOverviewForMonth(int month, int year)
        {
            ManagerHelper.VerifyMonthAndYear(month, year);
            var nextMonth = ManagerHelper.GetNextMonth(month, year);
            var thisMonth = ManagerHelper.GetThisMonth(month, year);
            
            var budgeted = await _context.BudgetEntry
                .Where(be => (be.Month == month && be.Year == year))
                .SumAsync(be => be.BudgetEntryAmount);

            var spent = await _context.Transaction
                .Where(t => t.TransactionDate < nextMonth && t.TransactionDate >= thisMonth && !t.Account.TrackingAccount)
                .SumAsync(t => t.ExpenseAmount);
            
            var income = await _context.Transaction
                .Where(t => t.TransactionDate < nextMonth && t.TransactionDate >= thisMonth && !t.Account.TrackingAccount)
                .SumAsync(t => t.IncomeAmount);
            
            var totalIncome = await _context.Transaction
                .Where(t => t.TransactionDate < nextMonth && !t.Account.TrackingAccount)
                .SumAsync(t => t.IncomeAmount);
            
            var totalBudgeted = await _context.BudgetEntry
                .Where(be => (be.Month <= month && be.Year == year) || be.Year < year)
                .SumAsync(be => be.BudgetEntryAmount);

            return new BudgetOverviewModel()
            {
                Budgeted = budgeted,
                Spent = spent,
                Income = income,
                ToBeBudgeted = totalIncome - totalBudgeted
            };
        }

        /// <summary>
        /// Initializes default budget for a given month
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        /// <exception cref="HttpRequestException"></exception>
        public async Task InitializeBudgetMonth(int month, int year)
        {
            ManagerHelper.VerifyMonthAndYear(month, year);

            var categoriesWithoutEntries = await _context.BudgetCategory
                .AsNoTracking()
                .Where(c => !c.BudgetEntries.Any(be => be.Month == month && be.Year == year) && c.DefaultAmount != 0)
                .Select(c => new BudgetCategory()
                {
                    BudgetCategoryId = c.BudgetCategoryId,
                    DefaultAmount = c.DefaultAmount
                })
                .ToListAsync();

            var missingBudgetEntries = categoriesWithoutEntries
                .Select(category => new BudgetEntry()
                {
                    Month = month, 
                    Year = year, 
                    BudgetEntryAmount = category.DefaultAmount, 
                    BudgetCategoryId = category.BudgetCategoryId
                })
                .ToList();
            
            _context.BudgetEntry.AddRange(missingBudgetEntries);
            await _context.SaveChangesAsync();
        }
    }
}