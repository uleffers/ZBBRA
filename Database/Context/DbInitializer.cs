using System.Collections.Generic;
using System.Linq;
using Database.Models;

namespace Database.Context
{
    public class DbInitializer
    {
        public static void Initialize(ZbbraDBContext context)
        {
            context.Database.EnsureCreated();

            if (context.CategoryGroup.Any() || context.BudgetCategory.Any())
            {
                return;
            }

            var categoryGroups = new List<CategoryGroup>()
            {
                new CategoryGroup()
                {
                    CategoryGroupName = "Nødvendige faste",
                    CategoryGroupIndex = 0,
                    BudgetCategories = new List<BudgetCategory>
                    {
                        new BudgetCategory()
                        {
                            CategoryName = "Fællesudgifter",
                            DefaultAmount = 5000,
                            CategoryIndex = 0
                        },
                        new BudgetCategory()
                        {
                            CategoryName = "Transport",
                            DefaultAmount = 400,
                            CategoryIndex = 1
                        },
                        new BudgetCategory()
                        {
                            CategoryName = "Forsikring",
                            DefaultAmount = 600,
                            CategoryIndex = 2
                        },
                    },
                },
                new CategoryGroup()
                {
                    CategoryGroupName = "Sjovere faste",
                    CategoryGroupIndex = 1,
                    BudgetCategories = new List<BudgetCategory>
                    {
                        new BudgetCategory()
                        {
                            CategoryName = "Valgfri faste",
                            DefaultAmount = 810,
                            CategoryIndex = 0
                        },
                        new BudgetCategory()
                        {
                            CategoryName = "Faste medier",
                            DefaultAmount = 410,
                            CategoryIndex = 1
                        },
                        new BudgetCategory()
                        {
                            CategoryName = "Tøj",
                            DefaultAmount = 350,
                            CategoryIndex = 2
                        },
                        new BudgetCategory()
                        {
                            CategoryName = "Gaver",
                            DefaultAmount = 400,
                            CategoryIndex = 3
                        },
                        new BudgetCategory()
                        {
                            CategoryName = "Uforudsete faste",
                            DefaultAmount = 0,
                            CategoryIndex = 4
                        },
                    },
                },
                new CategoryGroup()
                {
                    CategoryGroupName = "Fis og ballade",
                    CategoryGroupIndex = 2,
                    BudgetCategories = new List<BudgetCategory>
                    {
                        new BudgetCategory()
                        {
                            CategoryName = "Sjove penge",
                            DefaultAmount = 0,
                            CategoryIndex = 0
                        },
                        new BudgetCategory()
                        {
                            CategoryName = "Fælles hygge",
                            DefaultAmount = 650,
                            CategoryIndex = 1
                        },
                        new BudgetCategory()
                        {
                            CategoryName = "Film/musik/bøger",
                            DefaultAmount = 0,
                            CategoryIndex = 2
                        },
                        new BudgetCategory()
                        {
                            CategoryName = "Ting",
                            DefaultAmount = 0,
                            CategoryIndex = 3
                        },
                        new BudgetCategory()
                        {
                            CategoryName = "Elektronik",
                            DefaultAmount = 0,
                            CategoryIndex = 4
                        },
                        new BudgetCategory()
                        {
                            CategoryName = "Rejser",
                            DefaultAmount = 0,
                            CategoryIndex = 5
                        },
                    },
                },
                new CategoryGroup()
                {
                    CategoryGroupName = "Saving goals",
                    CategoryGroupIndex = 3,
                    BudgetCategories = new List<BudgetCategory>
                    {
                        new BudgetCategory()
                        {
                            CategoryName = "Small savings goal",
                            DefaultAmount = 0,
                            CategoryIndex = 0
                        },
                        new BudgetCategory()
                        {
                            CategoryName = "Medium savings goal",
                            DefaultAmount = 0,
                            CategoryIndex = 1
                        },
                        new BudgetCategory()
                        {
                            CategoryName = "Large savings goal",
                            DefaultAmount = 0,
                            CategoryIndex = 2
                        },
                        new BudgetCategory()
                        {
                            CategoryName = "Lejlighed",
                            DefaultAmount = 0,
                            CategoryIndex = 3
                        },
                        new BudgetCategory()
                        {
                            CategoryName = "Emergency fund",
                            DefaultAmount = 0,
                            CategoryIndex = 4
                        },
                        new BudgetCategory()
                        {
                            CategoryName = "Investeringer",
                            DefaultAmount = 4750,
                            CategoryIndex = 5
                        },
                    },
                }
            };

            var accounts = new List<Account>()
            {
                new Account()
                {
                    AccountName = "Løn",
                },
                new Account()
                {
                    AccountName = "Opsparing",
                }
            };
            
            context.CategoryGroup.AddRange(categoryGroups);
            context.Account.AddRange(accounts);
            context.SaveChanges();
        }
    }
}