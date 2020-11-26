using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Database.Context;
using Database.Models;
using ZBBRA.Business.Interfaces;

namespace ZBBRA.Business
{
    /// <summary>
    /// Manager used to fetch all base information
    /// </summary>
    public class BaseInformationManager : IBaseInformationManager
    {
        private readonly ZbbraDBContext _context;

        /// <summary>
        /// ctor
        /// </summary>
        /// <param name="context"></param>
        public BaseInformationManager(ZbbraDBContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Fetch all budget categories
        /// </summary>
        /// <returns></returns>
        public async Task<List<BudgetCategory>> GetBudgetCategories()
        {
            return await _context.BudgetCategory
                .AsNoTracking()
                .Select(x => new BudgetCategory()
                {
                    BudgetCategoryId = x.BudgetCategoryId,
                    CategoryName = x.CategoryName,
                    CategoryIndex = x.CategoryIndex,
                    CategoryGroup = new CategoryGroup()
                    {
                        CategoryGroupIndex = x.CategoryGroup.CategoryGroupIndex
                    }
                })
                .OrderBy(x => x.CategoryGroup.CategoryGroupIndex)
                .ThenBy(x => x.CategoryIndex)
                .ToListAsync();
        }

        /// <summary>
        /// Fetch all accounts
        /// </summary>
        /// <returns></returns>
        public async Task<List<Account>> GetAccounts()
        {
            return await _context.Account
                .AsNoTracking()
                .Select(x => new Account()
                {
                    AccountId = x.AccountId,
                    AccountName = x.AccountName
                })
                .OrderBy(x => x.AccountName)
                .ToListAsync();
        }
    }
}