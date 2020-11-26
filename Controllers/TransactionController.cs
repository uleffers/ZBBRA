using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Database.Context;
using Database.Models;
using Microsoft.AspNetCore.Mvc;
using ZBBRA.Business.Interfaces;
using ZBBRA.Controllers.DTOs;

namespace ZBBRA.Controllers
{
    /// <summary>
    /// REST service controller for Transactions 
    /// </summary>
    [Route("api/")]
    [ApiController]
    [Consumes("application/json")]
    [Produces("application/json")]
    public class TransactionController : ControllerBase
    {
        private readonly ZbbraDBContext _context;
        private readonly ITransactionManager _transactionManager;
        private readonly IMapper _mapper;

        /// <summary>
        /// ctor
        /// </summary>
        /// <param name="context"></param>
        /// <param name="transactionManager"></param>
        /// <param name="mapper"></param>
        public TransactionController(ZbbraDBContext context, ITransactionManager transactionManager, IMapper mapper)
        {
            _context = context;
            _transactionManager = transactionManager;
            _mapper = mapper;
        }

        /// <summary>
        /// Adds new transaction to the DB
        /// </summary>
        /// <param name="createTransactionDto"></param>
        /// <returns></returns>
        [HttpPost("transactions/add")]
        public async Task AddTransaction(CreateTransactionDTO createTransactionDto)
        {
            var transaction = _mapper.Map<Transaction>(createTransactionDto);
            await _transactionManager.AddTransaction(transaction);
        }

        /// <summary>
        /// Fetches all transactions in a given interval
        /// </summary>
        /// <param name="dateFrom"></param>
        /// <param name="dateTo"></param>
        /// <returns></returns>
        [HttpGet("transactions/gettransactionsinterval")]
        public async Task<List<TransactionDTO>> GetTransactionsInInterval(DateTime dateFrom, DateTime dateTo)
        {
            var transactions = await _transactionManager.GetTransactions(dateFrom, dateTo);
            var transactionDTOs = _mapper.Map<List<TransactionDTO>>(transactions);
            return transactionDTOs;
        }
        
        /// <summary>
        /// Fetches all transactions in a given interval
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        [HttpGet("transactions/gettransactionsinmonth")]
        public async Task<List<TransactionDTO>> GetTransactionsInInterval(int month, int year)
        {
            var transactions = await _transactionManager.GetTransactions(month, year);
            var transactionDTOs = _mapper.Map<List<TransactionDTO>>(transactions);
            return transactionDTOs;
        }
    }
}