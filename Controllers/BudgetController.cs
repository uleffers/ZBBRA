using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Database.Models;
using Microsoft.AspNetCore.Mvc;
using ZBBRA.Business.Interfaces;
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
        private readonly IBudgetManager _budgetManager;
        private readonly IMapper _mapper;

        /// <summary>
        /// ctor
        /// </summary>
        /// <param name="budgetManager"></param>
        /// <param name="mapper"></param>
        public BudgetController(IBudgetManager budgetManager, IMapper mapper)
        {
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
        /// Initialize budget month
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        [HttpPost("budget/initialize")]
        public async Task InitializeBudgetMonth(int month, int year)
        {
            await _budgetManager.InitializeBudgetMonth(month, year);
        }

        /// <summary>
        /// Retrieves budget for a given month
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        [HttpGet("budget/get")]
        public async Task<List<BudgetViewCategoryGroupDTO>> GetBudgetForMonth(int month, int year)
        {
            var budgetEntries = await _budgetManager.GetBudgetForMonth(month, year);

            var budgetEntryDTOs = _mapper.Map<List<BudgetViewCategoryGroupDTO>>(budgetEntries);

            return budgetEntryDTOs;

        }
        
        /// <summary>
        /// Retrieves budget overview for a given month
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        [HttpGet("budget/overview")]
        public async Task<BudgetOverviewDTO> GetBudgetOverviewForMonth(int month, int year)
        {
            var budgetOverviewModel = await _budgetManager.GetBudgetOverviewForMonth(month, year);

            var budgetOverviewDTO = _mapper.Map<BudgetOverviewDTO>(budgetOverviewModel);

            return budgetOverviewDTO;

        }
    }
}