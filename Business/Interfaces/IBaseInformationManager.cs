using System.Collections.Generic;
using System.Threading.Tasks;
using Database.Models;

namespace ZBBRA.Business.Interfaces
{
    /// <summary>
    /// Manager used for fetching base information
    /// </summary>
    public interface IBaseInformationManager
    {
        /// <summary>
        /// Gets all available budget categories
        /// </summary>
        /// <returns></returns>
        Task<List<BudgetCategory>> GetBudgetCategories();
        
        /// <summary>
        /// Gets all available accounts
        /// </summary>
        /// <returns></returns>
        Task<List<Account>> GetAccounts();
    }
}