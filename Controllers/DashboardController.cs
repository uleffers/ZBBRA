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
    /// REST service controller for handling the dashboard 
    /// </summary>
    [Route("api/")]
    [ApiController]
    [Consumes("application/json")]
    [Produces("application/json")]
    public class DashboardController
    {
        private readonly IDashboardManager _dashboardManager;
        private readonly IMapper _mapper;

        /// <summary>
        /// ctor
        /// </summary>
        /// <param name="dashboardManager"></param>
        /// <param name="mapper"></param>
        public DashboardController(IDashboardManager dashboardManager, IMapper mapper)
        {
            _dashboardManager = dashboardManager;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves the cashflow overview for a given month
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        [HttpGet("dashboard/getoverview")]
        public async Task<CashflowOverviewDTO> GetCashflowOverview(int month, int year)
        {
            var overviewModel = await _dashboardManager.GetCashflowOverview(month, year);
            var overviewDTO = _mapper.Map<CashflowOverviewDTO>(overviewModel);
            return overviewDTO;
        } 
    }
}