using System.Linq;
using AutoMapper;
using Database.Models;
using ZBBRA.Business.Models;
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
            
            CreateMap<BudgetViewCategoryGroupModel, BudgetViewCategoryGroupDTO>()
                .ForMember(des => des.CategoryGroupName, act => act.MapFrom(src => src.CategoryGroupName))
                .ForMember(des => des.Remaining, act => act.MapFrom(src => src.BudgetEntrySpentModels.Sum(x => 
                    x.PreviousBudgetEntrySum + x.BudgetEntry.BudgetEntryAmount - x.TransactionSum)))
                .ForMember(des => des.TransactionSum, act => act.MapFrom(src => src.BudgetEntrySpentModels.Sum(x => x.TransactionSum)))
                .ForMember(des => des.PreviousBudgetEntrySum, act => act.MapFrom(src => src.BudgetEntrySpentModels.Sum(x => x.PreviousBudgetEntrySum)))
                .ForMember(des => des.BudgetEntryAmount, act => act.MapFrom(src => src.BudgetEntrySpentModels.Sum(x => x.BudgetEntry.BudgetEntryAmount)))
                .ForMember(des => des.BudgetEntrySpentDTOs, act => act.MapFrom(src => src.BudgetEntrySpentModels));

            CreateMap<BudgetViewCategoryModel, BudgetViewCategoryDTO>()
                .ForMember(des => des.BudgetEntryId, act => act.MapFrom(src => src.BudgetEntry.BudgetEntryId))
                .ForMember(des => des.BudgetEntryAmount, act => act.MapFrom(src => src.BudgetEntry.BudgetEntryAmount))
                .ForMember(des => des.BudgetCategoryName, act => act.MapFrom(src => src.BudgetCategory.CategoryName))
                .ForMember(des => des.BudgetCategoryId, act => act.MapFrom(src => src.BudgetCategory.BudgetCategoryId))
                .ForMember(des => des.DefaultBudgetEntryAmount, act => act.MapFrom(src => src.BudgetCategory.DefaultAmount))
                .ForMember(des => des.TransactionSum, act => act.MapFrom(src => src.TransactionSum))
                .ForMember(des => des.PreviousBudgetEntrySum, act => act.MapFrom(src => src.PreviousBudgetEntrySum))
                .ForMember(des => des.Remaining, act => act.MapFrom(src =>
                        src.PreviousBudgetEntrySum + src.BudgetEntry.BudgetEntryAmount - src.TransactionSum));
            
            CreateMap<BudgetEntryDTO, BudgetEntry>()
                .ForMember(des => des.BudgetEntryId, act => act.MapFrom(src => src.BudgetEntryId))
                .ForMember(des => des.BudgetEntryAmount, act => act.MapFrom(src => src.BudgetEntryAmount))
                .ForAllOtherMembers(act => act.Ignore());
            
            CreateMap<BudgetEntry, BudgetEntryDTO>()
                .ForMember(des => des.BudgetEntryId, act => act.MapFrom(src => src.BudgetEntryId))
                .ForMember(des => des.BudgetEntryAmount, act => act.MapFrom(src => src.BudgetEntryAmount))
                .ForAllOtherMembers(act => act.Ignore());
            
            CreateMap<CreateBudgetEntryDTO, BudgetEntry>()
                .ForMember(des => des.Month, act => act.MapFrom(src => src.Month))
                .ForMember(des => des.Year, act => act.MapFrom(src => src.Year))
                .ForMember(des => des.BudgetCategoryId, act => act.MapFrom(src => src.BudgetCategoryId))
                .ForMember(des => des.BudgetEntryAmount, act => act.MapFrom(src => src.BudgetEntryAmount))
                .ForAllOtherMembers(act => act.Ignore());
        }
    }
}