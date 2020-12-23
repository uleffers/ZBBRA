using System.Threading.Tasks;
using ZBBRA.Business.Models;

namespace ZBBRA.Business.Interfaces
{
    public interface IDashboardManager
    {
        public Task<CashflowOverviewModel> GetCashflowOverview(int month, int year);
    }
}