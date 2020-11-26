using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Database.Models;

namespace ZBBRA.Business.Interfaces
{
    /// <summary>
    /// Manager for handling transactions
    /// </summary>
    public interface ITransactionManager
    {
        /// <summary>
        /// Add transaction
        /// </summary>
        /// <param name="transaction"></param>
        /// <returns></returns>
        Task AddTransaction(Transaction transaction);
        
        /// <summary>
        /// Gets a list of transaction for a given month
        /// </summary>
        /// <param name="dateFrom"></param>
        /// <param name="dateTo"></param>
        /// <returns></returns>
        /// <exception cref="HttpRequestException"></exception>
        Task<List<Transaction>> GetTransactions(DateTime dateFrom, DateTime dateTo);

        /// <summary>
        /// Gets a list of transaction for a given month
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        /// <exception cref="HttpRequestException"></exception>
        Task<List<Transaction>> GetTransactions(int month, int year);
    }
}