using AutoMapper;
using Database.Models;
using ZBBRA.Controllers.DTOs;

namespace ZBBRA.Controllers.MappingProfiles
{
    public class TransactionMapping : Profile
    {
        public TransactionMapping()
        {
            CreateMap<CreateTransactionDTO, Transaction>()
                .ForMember(des => des.TransactionDate, act => act.MapFrom(src => src.TransactionDate))
                .ForMember(des => des.TransactionAmount, act => act.MapFrom(src => src.TransactionAmount))
                .ForMember(des => des.TransactionNote, act => act.MapFrom(src => src.TransactionNote))
                .ForMember(des => des.BudgetCategoryId, act => act.MapFrom(src => src.BudgetCategoryId))
                .ForMember(des => des.AccountId, act => act.MapFrom(src => src.AccountId))
                .ForAllOtherMembers(act => act.Ignore());
            CreateMap<Transaction, TransactionDTO>()
                .ForMember(des => des.TransactionId, act => act.MapFrom(src => src.TransactionId))
                .ForMember(des => des.TransactionDate, act => act.MapFrom(src => src.TransactionDate))
                .ForMember(des => des.TransactionAmount, act => act.MapFrom(src => src.TransactionAmount))
                .ForMember(des => des.TransactionNote, act => act.MapFrom(src => src.TransactionNote))
                .ForMember(des => des.BudgetCategoryId, act => act.MapFrom(src => src.BudgetCategoryId))
                .ForMember(des => des.AccountId, act => act.MapFrom(src => src.AccountId))
                .ForAllOtherMembers(act => act.Ignore());
        }
    }
}