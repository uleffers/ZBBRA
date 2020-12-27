using System.Collections.Generic;
using System.Threading.Tasks;
using ZBBRA.Business.Models;

namespace ZBBRA.Business.Interfaces
{
    public interface IDashboardManager
    {
        /// <summary>
        /// Gets Cashflow overview in a given month
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        public Task<CashflowOverviewModel> GetCashflowOverview(int month, int year);

        /// <summary>
        /// Gets balance history for each account
        /// </summary>
        /// <returns></returns>
        public Task<List<BalanceHistoryModel>> GetBalanceHistory();
    }
}