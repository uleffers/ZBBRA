using System;
using System.Collections.Generic;
using ZBBRA.Business.Models;

namespace ZBBRA.Controllers.DTOs
{
    /// <summary>
    /// Account balance in a given month (end of each month)
    /// </summary>
    public class BalanceHistoryDTO
    {
        /// <summary>
        /// Month
        /// </summary>
        public DateTime Month { get; set; }
        /// <summary>
        /// Account balances
        /// </summary>
        public List<AccountBalanceDTO> AccountBalances { get; set; } = new List<AccountBalanceDTO>();
    }
}