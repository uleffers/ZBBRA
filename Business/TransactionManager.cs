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

            if (transaction.AccountId != null
                && !_context.Account.Any(x => x.AccountId == transaction.AccountId))
            {
                throw new HttpRequestException("Account not recognised.");
            }

            _context.Transaction.Add(transaction);
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Updates transaction in DB
        /// </summary>
        /// <param name="transaction"></param>
        /// <returns></returns>
        /// <exception cref="HttpRequestException"></exception>
        public async Task UpdateTransaction(Transaction transaction)
        {
            if (transaction.TransactionId == Guid.Empty
                || !await _context.Transaction.AnyAsync(x => x.TransactionId == transaction.TransactionId))
            {
                throw new HttpRequestException("Transaction could not be found in DB.");
            }

            var persistedTransaction = await _context.Transaction
                .FirstOrDefaultAsync(x => x.TransactionId == transaction.TransactionId);

            persistedTransaction.TransactionDate = transaction.TransactionDate;
            persistedTransaction.ExpenseAmount = transaction.ExpenseAmount;
            persistedTransaction.IncomeAmount = transaction.IncomeAmount;
            persistedTransaction.TransactionNote = transaction.TransactionNote;
            persistedTransaction.BudgetCategoryId = transaction.BudgetCategoryId;
            persistedTransaction.AccountId = transaction.AccountId;

            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Deletes transaction from DB
        /// </summary>
        /// <param name="transactionId"></param>
        /// <returns></returns>
        /// <exception cref="HttpRequestException"></exception>
        public async Task DeleteTransaction(Guid transactionId)
        {
            if (transactionId == Guid.Empty || !await _context.Transaction.AnyAsync(x => x.TransactionId == transactionId))
            {
                throw new HttpRequestException("Transaction could not be found in DB.");
            }

            _context.Entry(new Transaction() {TransactionId = transactionId}).State = EntityState.Deleted;
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
            ManagerHelper.VerifyMonthAndYear(month, year);

            var returnTransaction = await _context.Transaction
                .AsNoTracking()
                .Where(x => x.TransactionDate.Month == month && x.TransactionDate.Year == year)
                .Select(x => new Transaction()
                {
                    TransactionId = x.TransactionId,
                    TransactionDate = x.TransactionDate,
                    ExpenseAmount = x.ExpenseAmount,
                    IncomeAmount = x.IncomeAmount,
                    TransactionNote = x.TransactionNote,
                    BudgetCategoryId = x.BudgetCategoryId,
                    AccountId = x.AccountId
                })
                .OrderByDescending(x => x.TransactionDate)
                .ToListAsync();

            return returnTransaction;
        }

        /// <summary>
        /// Sums all income in a given month
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        /// <exception cref="HttpRequestException"></exception>
        public async Task<decimal> GetIncome(int month, int year)
        {
            ManagerHelper.VerifyMonthAndYear(month, year);

            var income = await _context.Transaction
                .AsNoTracking()
                .Where(x => x.TransactionDate.Month == month && x.TransactionDate.Year == year)
                .Select(x => x.IncomeAmount)
                .ToListAsync();

            return income.Sum();
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
                    ExpenseAmount = x.ExpenseAmount,
                    IncomeAmount = x.IncomeAmount,
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