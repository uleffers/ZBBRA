using System.Linq;
using Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Database.Context
{
    public class ZbbraDBContext : DbContext
    {
        public ZbbraDBContext(DbContextOptions<ZbbraDBContext> options) : base(options)
        {
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