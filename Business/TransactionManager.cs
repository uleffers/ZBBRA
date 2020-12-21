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
        /// Generates testdata for a given month
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <param name="numberOfTransactions"></param>
        /// <returns></returns>
        public async Task GenerateTestdata(int month, int year, int numberOfTransactions)
        {
            var categories = await _context.BudgetCategory.Select(x => x.BudgetCategoryId).ToListAsync();
            var accounts = await _context.Account.Select(x => x.AccountId).ToListAsync();

            var notes = new List<string>()
            {
                "Spisebord", "Kaffe", "Netflix", "Avis", "Fælles", "Mad", "Restaurant", "Deo", "Sokker"

            };
            
            var transactions = new List<Transaction>();
            Random random = new Random();

            for (int i = 0; i < numberOfTransactions; i++)
            {
                transactions.Add(new Transaction()
                {
                    ExpenseAmount = random.Next(- 5000, 5000),
                    BudgetCategoryId = categories[random.Next(categories.Count)],
                    AccountId = accounts[random.Next(accounts.Count)],
                    TransactionNote = notes[random.Next(notes.Count)],
                    TransactionDate = new DateTime(year, month, random.Next(1, month == 2 ? 28 : 30))
                });
            }

            _context.Transaction.AddRange(transactions);
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
            if (month < 1 || month > 12)
            {
                throw new HttpRequestException("Invald month");
            }
            
            if (year < 1000 || year > 9999)
            {
                throw new HttpRequestException("Invald year");
            }

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