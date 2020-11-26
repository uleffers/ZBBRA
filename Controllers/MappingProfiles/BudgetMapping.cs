using AutoMapper;
using Database.Models;
using ZBBRA.Controllers.DTOs;

namespace ZBBRA.Controllers.MappingProfiles
{
    /// <summary>
    /// Mapping profile for budget related DTOs
    /// </summary>
    public class BudgetMapping : Profile
    {
        public BudgetMapping()
        {
            CreateMap<BudgetCategory, BudgetCategoryDTO>();
            CreateMap<Account, AccountDTO>();
        }
    }
}