using System;

namespace ZBBRA.Controllers.DTOs
{
    /// <summary>
    /// Account DTO - used when creating new Transaction
    /// </summary>
    public class AccountDTO
    {
        /// <summary>
        /// Account ID
        /// </summary>
        public Guid AccountId { get; set; }
        /// <summary>
        /// Account name
        /// </summary>
        public string AccountName { get; set; }
    }
}