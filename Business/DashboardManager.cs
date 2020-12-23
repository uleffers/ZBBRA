using System;
using System.Net.Http;
using System.Threading.Tasks;
using Database.Context;
using ZBBRA.Business.Interfaces;
using ZBBRA.Business.Models;

using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Database.Models;

namespace ZBBRA.Business
{
    public class DashboardManager : IDashboardManager
    {
        private readonly ZbbraDBContext _context;
        
        /// <summary>
        /// ctor
        /// </summary>
        /// <param name="context"></param>
        public DashboardManager(ZbbraDBContext context)
        {
            _context = context;
        }
        
        private static void VerifyMonthAndYear(int month, int year)
        {
            if (month < 1 || month > 12)
            {
                throw new HttpRequestException("Invalid month");
            }
            
            if (year < 1000 || year > 9999)
            {
                throw new HttpRequestException("Invalid year");
            }
        }
        
        /// <summary>
        /// Gets the Cashflow overview for a given month
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        public async Task<CashflowOverviewModel> GetCashflowOverview(int month, int year)
        {
            VerifyMonthAndYear(month, year);
            var nextMonth = month == 12 ? new DateTime(year + 1, 1, 1) : new DateTime(year, month + 1, 1);
            var thisMonth = new DateTime(year, month, 1);
            var overview = new CashflowOverviewModel();
            overview.IncomeTotal = await _context.Transaction
                .Where(t => t.TransactionDate < nextMonth && t.TransactionDate >= thisMonth &&
                            !t.Account.TrackingAccount)
                .SumAsync(x => x.IncomeAmount);
            
            var allTransactionsInMonth = await _context.Transaction
                .Where(t => t.TransactionDate < nextMonth && t.TransactionDate >= thisMonth &&
                            !t.Account.TrackingAccount)
                .Select(t => new Transaction()
                {
                    ExpenseAmount = t.ExpenseAmount,
                    BudgetCategory = new BudgetCategory()
                    {
                        CategoryName = t.BudgetCategory == null ? "" : t.BudgetCategory.CategoryName,
                    }
                })
                .ToListAsync();

            overview.ExpenseTotal = allTransactionsInMonth.Sum(x => x.ExpenseAmount);
            
            foreach (var category in allTransactionsInMonth.GroupBy(x => x.BudgetCategory.CategoryName))
            {
                overview.CashflowCategories.Add(
                    new KeyValuePair<string, decimal>(
                        category.Key, 
                        category.Sum(x => x.ExpenseAmount)
                    )
                );
            }

            overview.CashflowCategories = overview
                .CashflowCategories
                .OrderByDescending(x => x.Value)
                .ToList();

            return overview;
        }
    }
}