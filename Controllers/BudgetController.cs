using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Database.Context;
using Database.Models;
using Microsoft.AspNetCore.Mvc;
using ZBBRA.Business.Interfaces;
using ZBBRA.Business.Models;
using ZBBRA.Controllers.DTOs;

namespace ZBBRA.Controllers
{
    /// <summary>
    /// REST service controller for handling budget 
    /// </summary>
    [Route("api/")]
    [ApiController]
    [Consumes("application/json")]
    [Produces("application/json")]
    public class BudgetController : ControllerBase
    {
        private readonly ZbbraDBContext _context;
        private readonly IBudgetManager _budgetManager;
        private readonly IMapper _mapper;

        /// <summary>
        /// ctor
        /// </summary>
        /// <param name="context"></param>
        /// <param name="budgetManager"></param>
        /// <param name="mapper"></param>
        public BudgetController(ZbbraDBContext context, IBudgetManager budgetManager, IMapper mapper)
        {
            _context = context;
            _budgetManager = budgetManager;
            _mapper = mapper;
        }

        /// <summary>
        /// Update budget entry
        /// </summary>
        /// <param name="budgetEntryId"></param>
        /// <param name="budgetEntryAmount"></param>
        /// <returns></returns>
        [HttpPatch("budget/update")]
        public async Task UpdateBudgetEntry(Guid budgetEntryId, decimal budgetEntryAmount)
        {
            await _budgetManager.UpdateBudgetEntry(budgetEntryId, budgetEntryAmount);
        }

        /// <summary>
        /// Add budget entry
        /// </summary>
        /// <param name="createBudgetEntryDTO"></param>
        /// <returns></returns>
        [HttpPost("budget/add")]
        public async Task AddBudgetEntry(CreateBudgetEntryDTO createBudgetEntryDTO)
        {
            var budgetEntry = _mapper.Map<BudgetEntry>(createBudgetEntryDTO);
            await _budgetManager.AddBudgetEntry(budgetEntry);
        }

        /// <summary>
        /// Retrieves budget for a given month
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        [HttpGet("budget/get")]
        public async Task<List<BudgetGroupDTO>> GetBudgetForMonth(int month, int year)
        {
            var budgetEntries = await _budgetManager.GetBudgetForMonth(month, year);

            var budgetEntryDTOs = _mapper.Map<List<BudgetGroupDTO>>(budgetEntries);

            return budgetEntryDTOs;

        }
    }
}