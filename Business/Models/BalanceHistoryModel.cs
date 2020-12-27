using System;
using System.Collections.Generic;

namespace ZBBRA.Business.Models
{
    public class BalanceHistoryModel
    {
        public DateTime Month { get; set; }
        public List<AccountBalanceModel> AccountBalances { get; set; } = new List<AccountBalanceModel>();
    }
}