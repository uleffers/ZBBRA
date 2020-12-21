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

        /// <summary>
        /// Specifies whether the account is used for tracking only
        /// </summary>
        public bool TrackingAccount { get; set; }
    }
}