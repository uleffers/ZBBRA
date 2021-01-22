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
    /// REST service controller for Base information about e.g. available Categories and Accounts 
    /// </summary>
    [Route("api/")]
    [ApiController]
    [Consumes("application/json")]
    [Produces("application/json")]
    public class BaseInformationController : ControllerBase
    {
        private readonly ZbbraDBContext _context;
        private readonly IBaseInformationManager _baseInformationManager;
        private readonly IMapper _mapper;

        public BaseInformationController(ZbbraDBContext context, IBaseInformationManager baseInformationManager, IMapper mapper)
        {
            _context = context;
            _baseInformationManager = baseInformationManager;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves a list of all budget categories
        /// </summary>
        /// <returns></returns>
        [HttpGet("baseinformation/getbudgetcategories")]
        public async Task<List<BudgetCategoryDTO>> GetBudgetCategories()
        {
            var categories = await _baseInformationManager.GetBudgetCategories();
            var categoryDTOs = _mapper.Map<List<BudgetCategoryDTO>>(categories);
            return categoryDTOs;
        }
        
        /// <summary>
        /// Retrieves a list of all accounts
        /// </summary>
        /// <returns></returns>
        [HttpGet("baseinformation/getaccounts")]
        public async Task<List<AccountDTO>> GetAccounts()
        {
            var accounts = await _baseInformationManager.GetAccounts();
            var accountDTOs = _mapper.Map<List<AccountDTO>>(accounts);

            return accountDTOs;
        }
    }
}