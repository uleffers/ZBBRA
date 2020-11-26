using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Database.Context;
using Database.Models;
using ZBBRA.Business.Interfaces;

namespace ZBBRA.Business
{
    /// <summary>
    /// Manager for handling transactions
    /// </summary>
    public class TransactionManager : ITransactionManager
    {
        private readonly ZbbraDBContext _context;
        
        /// <summary>
        /// ctor
        /// </summary>
        /// <param name="context"></param>
        public TransactionManager(ZbbraDBContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Add transaction
        /// </summary>
        /// <param name="transaction"></param>
        /// <returns></returns>
        public async Task AddTransaction(Transaction transaction)
        {
            if (transaction.AccountId == Guid.Empty
                || !_context.Account.Any(x => x.AccountId == transaction.AccountId))
            {
                throw new HttpRequestException("Account is missing on transaction.");
            }

            if (transaction.BudgetCategoryId != null
                && !_context.BudgetCategory.Any(x => x.BudgetCategoryId == transaction.BudgetCategoryId))
            {
                throw new HttpRequestException("BudgetCategory not recognised.");
            }

            _context.Transaction.Add(transaction);
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Gets a list of transaction for a given month
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        /// <exception cref="HttpRequestException"></exception>
        public async Task<List<Transaction>> GetTransactions(int month, int year)
        {
            if (month < 1 || month > 12)
            {
                throw new HttpRequestException("Invald month");
            }
            
            if (year < 1000 || year > 9999)
            {
                throw new HttpRequestException("Invald year");
            }

            var returnTransaction = await _context.Transaction
                .AsNoTracking()
                .Where(x => x.TransactionDate.Month == month && x.TransactionDate.Year == year)
                .Select(x => new Transaction()
                {
                    TransactionId = x.TransactionId,
                    TransactionDate = x.TransactionDate,
                    TransactionAmount = x.TransactionAmount,
                    TransactionNote = x.TransactionNote,
                    BudgetCategoryId = x.BudgetCategoryId,
                    AccountId = x.AccountId
                })
                .OrderBy(x => x.TransactionDate)
                .ToListAsync();

            return returnTransaction;
        }

        /// <summary>
        /// Gets a list of transaction for a given month
        /// </summary>
        /// <param name="dateFrom"></param>
        /// <param name="dateTo"></param>
        /// <returns></returns>
        /// <exception cref="HttpRequestException"></exception>
        public async Task<List<Transaction>> GetTransactions(DateTime dateFrom, DateTime dateTo)
        {
            if (dateFrom > dateTo)
            {
                throw new HttpRequestException("Invalid date interval");
            }

            var returnTransaction = await _context.Transaction
                .AsNoTracking()
                .Where(x => 
                    x.TransactionDate.Date >= dateFrom.Date 
                    && x.TransactionDate.Date <= dateTo.Date)
                .Select(x => new Transaction()
                {
                    TransactionId = x.TransactionId,
                    TransactionDate = x.TransactionDate,
                    TransactionAmount = x.TransactionAmount,
                    TransactionNote = x.TransactionNote,
                    BudgetCategoryId = x.BudgetCategoryId,
                    AccountId = x.AccountId
                })
                .OrderBy(x => x.TransactionDate)
                .ToListAsync();

            return returnTransaction;
        }
    }
}