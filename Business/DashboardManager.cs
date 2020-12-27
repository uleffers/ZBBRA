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
        
        
        
        /// <summary>
        /// Gets the Cashflow overview for a given month
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        public async Task<CashflowOverviewModel> GetCashflowOverview(int month, int year)
        {
            ManagerHelper.VerifyMonthAndYear(month, year);
            var nextMonth = ManagerHelper.GetNextMonth(month, year);
            var thisMonth = ManagerHelper.GetThisMonth(month, year);
            
            var overview = new CashflowOverviewModel();
            
            var allTransactionsInMonth = await _context.Transaction
                .Where(t => t.TransactionDate < nextMonth 
                            && t.TransactionDate >= thisMonth 
                            && !t.Account.TrackingAccount)
                .Select(t => new Transaction()
                {
                    ExpenseAmount = t.ExpenseAmount,
                    IncomeAmount = t.IncomeAmount,
                    BudgetCategory = new BudgetCategory()
                    {
                        CategoryName = t.BudgetCategory == null ? "" : t.BudgetCategory.CategoryName,
                        CategoryGroup = new CategoryGroup()
                        {
                            CategoryGroupName = t.BudgetCategory.CategoryGroup.CategoryGroupName
                        }
                    }
                })
                .ToListAsync();

            overview.IncomeTotal = allTransactionsInMonth
                .Where(t => t.IncomeAmount != 0)
                .Sum(x => x.IncomeAmount);
            
            var allExpensesInMonth = allTransactionsInMonth.Where(t => t.IncomeAmount == 0).ToList();

            overview.ExpenseTotal = allExpensesInMonth.Sum(x => x.ExpenseAmount);
            
            overview.CashflowCategories = GetCashflowCategories(allExpensesInMonth);
            overview.CashflowGroups = GetCashflowGroups(allExpensesInMonth);

            return overview;
        }

        /// <summary>
        /// Fetches the accountbalances for each account
        /// </summary>
        /// <returns></returns>
        public async Task<List<BalanceHistoryModel>> GetBalanceHistory()
        {
            var allTransactions = await _context.Transaction.Select(x => new Transaction()
                {
                    ExpenseAmount = x.ExpenseAmount,
                    IncomeAmount = x.IncomeAmount,
                    TransactionDate = x.TransactionDate,
                    Account = new Account()
                    {
                        AccountName = x.Account.AccountName
                    }
                })
                .ToListAsync();
            var allAccounts = allTransactions.Select(x => x.Account.AccountName).Distinct().ToList();

            var firstDate = allTransactions.Min(x => x.TransactionDate);
            var lastDate = allTransactions.Max(x => x.TransactionDate);

            List<BalanceHistoryModel> returnList = new List<BalanceHistoryModel>();

            var currentMonth = new DateTime(firstDate.Year, firstDate.Month, 1);
            int i = -1;
            
            while (currentMonth <= lastDate)
            {
                var nextMonth = ManagerHelper.GetNextMonth(currentMonth.Month, currentMonth.Year);
                List<AccountBalanceModel> accountBalanceMonth = new List<AccountBalanceModel>();
                
                foreach (var account in allAccounts)
                {
                    var transactionsInAccount = allTransactions
                        .Where(t => account == t.Account.AccountName && t.TransactionDate < nextMonth &&
                                    t.TransactionDate >= currentMonth)
                        .Sum(x => x.IncomeAmount - x.ExpenseAmount);
                    
                    var lastTransactionsInAccount = i > -1 
                        ? returnList[i]
                            .AccountBalances
                            .First(x => x.AccountName==account)
                            .AccountBalance 
                        : 0;
                    
                    accountBalanceMonth.Add(new AccountBalanceModel()
                    {
                        AccountName = account,
                        AccountBalance = transactionsInAccount + lastTransactionsInAccount,
                    });
                }
                
                returnList.Add(new BalanceHistoryModel()
                {
                    Month = currentMonth,
                    AccountBalances = accountBalanceMonth
                });

                i++;
                currentMonth = nextMonth;
            }

            return returnList;
        }
        
        private List<KeyValuePair<string, decimal>> GetCashflowCategories(List<Transaction> allTransactionsInMonth)
        {
            var returnList = new List<KeyValuePair<string, decimal>>();
            
            foreach (var category in allTransactionsInMonth.GroupBy(x => x.BudgetCategory?.CategoryName))
            {
                returnList.Add(
                    new KeyValuePair<string, decimal>(
                        category.Key, 
                        category.Sum(x => x.ExpenseAmount)
                    )
                );
            }
            returnList = returnList
                .OrderByDescending(x => x.Value)
                .ToList();
            return returnList;
        }
        
        private List<KeyValuePair<string, decimal>> GetCashflowGroups(List<Transaction> allTransactionsInMonth)
        {
            var returnList = new List<KeyValuePair<string, decimal>>();
            
            foreach (var category in allTransactionsInMonth.GroupBy(x => x.BudgetCategory?.CategoryGroup.CategoryGroupName))
            {
                returnList.Add(
                    new KeyValuePair<string, decimal>(
                        category.Key, 
                        category.Sum(x => x.ExpenseAmount)
                    )
                );
            }
            returnList = returnList
                .OrderByDescending(x => x.Value)
                .ToList();
            return returnList;
        }
    }
}