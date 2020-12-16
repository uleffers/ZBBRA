using System;
using System.Collections.Generic;
using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Database.Context;
using Database.Models;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using ZBBRA.Business.Interfaces;
using ZBBRA.Business.Models;
using ZBBRA.Controllers.DTOs;

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
        public async Task<List<BudgetGroupModel>> GetBudgetForMonth(int month, int year)
        {
            if (month < 1 || month > 12)
            {
                throw new HttpRequestException("Invald month");
            }
            
            if (year < 1000 || year > 9999)
            {
                throw new HttpRequestException("Invald year");
            }

            var nextMonth = month == 12 ? new DateTime(year + 1, 1, 1) : new DateTime(year, month + 1, 1);
            var thisMonth = new DateTime(year, month, 1);
            var budgetEntrySpent = await _context.BudgetCategory
                .Select(x => new BudgetEntrySpentModel
                {
                    BudgetEntry = x.BudgetEntries.FirstOrDefault(be => be.Month == month && be.Year == year) ?? new BudgetEntry()
                    {
                        BudgetEntryAmount = x.DefaultAmount,
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
                            CategoryGroupName = x.CategoryGroup.CategoryGroupName
                        },
                        CategoryGroupId = x.CategoryGroupId,
                        CategoryIndex = x.CategoryIndex
                    },
                    TransactionSum = x.Transactions
                        .Where(t => t.TransactionDate < nextMonth && t.TransactionDate >= thisMonth)
                        .Sum(t => t.ExpenseAmount - t.IncomeAmount),
                    PreviousBudgetEntrySum = (x.BudgetEntries
                        .Where(be => (be.Month < month && be.Year == year) || (be.Year < year))
                        .Sum(be => be.BudgetEntryAmount)
                    - x.Transactions.Where(t => t.TransactionDate < thisMonth).Sum(t => t.ExpenseAmount - t.IncomeAmount))
                })
                .ToListAsync();

            var entriesGrouped = budgetEntrySpent
                .GroupBy(x => x.BudgetCategory.CategoryGroupId)
                .OrderBy(x => x.First().BudgetCategory.CategoryGroup.CategoryGroupIndex);

            var entriesInGroups = new List<BudgetGroupModel>();

            foreach (var group in entriesGrouped)
            {
                var name = group.First().BudgetCategory?.CategoryGroup?.CategoryGroupName;
                entriesInGroups.Add(new BudgetGroupModel()
                {
                    CategoryGroupName = name,
                    BudgetEntrySpentModels = group.OrderBy(x => x.BudgetCategory.CategoryIndex).ToList()
                });
            }
            
            return entriesInGroups;
        }
    }
}