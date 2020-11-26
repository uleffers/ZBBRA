using System.Collections.Generic;
using System.Linq;
using Database.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Database.Context
{
    public partial class ZbbraDBContext : DbContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ZbbraDBContext(DbContextOptions<ZbbraDBContext> options) : base(options)
        {
            try
            {
                _httpContextAccessor = this.GetService<IHttpContextAccessor>();
            }
            catch
            {
                //We do nothing, it's optional dependency
            }
        }

        public DbSet<Account> Account { get; set; }
        public DbSet<BudgetCategory> BudgetCategory { get; set; }
        public DbSet<BudgetEntry> BudgetEntry { get; set; }
        public DbSet<CategoryGroup> CategoryGroup { get; set; }
        public DbSet<Transaction> Transaction { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Specifies delete behavior for all entities in the model
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }
    }
}