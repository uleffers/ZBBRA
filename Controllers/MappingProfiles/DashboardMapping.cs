using System.Collections.Generic;
using AutoMapper;
using ZBBRA.Business.Models;
using ZBBRA.Controllers.DTOs;

namespace ZBBRA.Controllers.MappingProfiles
{
    /// <summary>
    /// Mapping for Dashboard related DTOs
    /// </summary>
    public class DashboardMapping : Profile
    {
        public DashboardMapping()
        {
            CreateMap<BudgetOverviewModel, BudgetOverviewDTO>()
                .ForMember(des => des.Budgeted, act => act.MapFrom(src => src.Budgeted))
                .ForMember(des => des.Income, act => act.MapFrom(src => src.Income))
                .ForMember(des => des.Spent, act => act.MapFrom(src => src.Spent))
                .ForMember(des => des.ToBeBudgeted, act => act.MapFrom(src => src.ToBeBudgeted));
            
            CreateMap<CashflowOverviewModel, CashflowOverviewDTO>()
                .ForMember(des => des.IncomeTotal, act => act.MapFrom(src => src.IncomeTotal))
                .ForMember(des => des.ExpenseTotal, act => act.MapFrom(src => src.ExpenseTotal))
                .ForMember(des => des.CashflowCategories, act => act.MapFrom(src => src.CashflowCategories))
                .ForMember(des => des.CashflowGroups, act => act.MapFrom(src => src.CashflowGroups))

                .ForAllOtherMembers(act => act.Ignore());
            
            CreateMap<KeyValuePair<string, decimal>, CashflowCategoryDTO>()
                .ForMember(des => des.BudgetCategoryName, act => act.MapFrom(src => src.Key))
                .ForMember(des => des.Spent, act => act.MapFrom(src => src.Value));

        }
    }
}