﻿using AutoMapper;
using Database.Models;
using ZBBRA.Controllers.DTOs;

namespace ZBBRA.Controllers.MappingProfiles
{
    /// <summary>
    /// Mapping profile for Transaction related DTOs
    /// </summary>
    public class TransactionMapping : Profile
    {
        public TransactionMapping()
        {
            CreateMap<CreateTransactionDTO, Transaction>()
                .ForMember(des => des.TransactionDate, act => act.MapFrom(src => src.TransactionDate))
                .ForMember(des => des.ExpenseAmount, act => act.MapFrom(src => src.ExpenseAmount))
                .ForMember(des => des.IncomeAmount, act => act.MapFrom(src => src.IncomeAmount))
                .ForMember(des => des.TransactionNote, act => act.MapFrom(src => src.TransactionNote))
                .ForMember(des => des.BudgetCategoryId, act => act.MapFrom(src => src.BudgetCategoryId))
                .ForMember(des => des.AccountId, act => act.MapFrom(src => src.AccountId))
                .ForAllOtherMembers(act => act.Ignore());
            
            CreateMap<Transaction, TransactionDTO>()
                .ForMember(des => des.TransactionId, act => act.MapFrom(src => src.TransactionId))
                .ForMember(des => des.TransactionDate, act => act.MapFrom(src => src.TransactionDate))
                .ForMember(des => des.ExpenseAmount, act => act.MapFrom(src => src.ExpenseAmount))
                .ForMember(des => des.IncomeAmount, act => act.MapFrom(src => src.IncomeAmount))
                .ForMember(des => des.TransactionNote, act => act.MapFrom(src => src.TransactionNote))
                .ForMember(des => des.BudgetCategoryId, act => act.MapFrom(src => src.BudgetCategoryId))
                .ForMember(des => des.AccountId, act => act.MapFrom(src => src.AccountId))
                .ForAllOtherMembers(act => act.Ignore());
            
            CreateMap<TransactionDTO, Transaction>()
                .ForMember(des => des.TransactionId, act => act.MapFrom(src => src.TransactionId))
                .ForMember(des => des.TransactionDate, act => act.MapFrom(src => src.TransactionDate))
                .ForMember(des => des.ExpenseAmount, act => act.MapFrom(src => src.ExpenseAmount))
                .ForMember(des => des.IncomeAmount, act => act.MapFrom(src => src.IncomeAmount))
                .ForMember(des => des.TransactionNote, act => act.MapFrom(src => src.TransactionNote))
                .ForMember(des => des.BudgetCategoryId, act => act.MapFrom(src => src.BudgetCategoryId))
                .ForMember(des => des.AccountId, act => act.MapFrom(src => src.AccountId))
                .ForAllOtherMembers(act => act.Ignore());
        }
    }
}