using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Database.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Account",
                columns: table => new
                {
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AccountName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TrackingAccount = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account", x => x.AccountId);
                });

            migrationBuilder.CreateTable(
                name: "CategoryGroup",
                columns: table => new
                {
                    CategoryGroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CategoryGroupIndex = table.Column<int>(type: "int", nullable: false),
                    CategoryGroupName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryGroup", x => x.CategoryGroupId);
                });

            migrationBuilder.CreateTable(
                name: "BudgetCategory",
                columns: table => new
                {
                    BudgetCategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CategoryIndex = table.Column<int>(type: "int", nullable: false),
                    DefaultAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CategoryGroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BudgetCategory", x => x.BudgetCategoryId);
                    table.ForeignKey(
                        name: "FK_BudgetCategory_CategoryGroup_CategoryGroupId",
                        column: x => x.CategoryGroupId,
                        principalTable: "CategoryGroup",
                        principalColumn: "CategoryGroupId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BudgetEntry",
                columns: table => new
                {
                    BudgetEntryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Month = table.Column<int>(type: "int", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    BudgetEntryAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BudgetCategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BudgetEntry", x => x.BudgetEntryId);
                    table.ForeignKey(
                        name: "FK_BudgetEntry_BudgetCategory_BudgetCategoryId",
                        column: x => x.BudgetCategoryId,
                        principalTable: "BudgetCategory",
                        principalColumn: "BudgetCategoryId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Transaction",
                columns: table => new
                {
                    TransactionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TransactionDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IncomeAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ExpenseAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TransactionNote = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BudgetCategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transaction", x => x.TransactionId);
                    table.ForeignKey(
                        name: "FK_Transaction_Account_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Account",
                        principalColumn: "AccountId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Transaction_BudgetCategory_BudgetCategoryId",
                        column: x => x.BudgetCategoryId,
                        principalTable: "BudgetCategory",
                        principalColumn: "BudgetCategoryId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BudgetCategory_CategoryGroupId",
                table: "BudgetCategory",
                column: "CategoryGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_BudgetEntry_BudgetCategoryId",
                table: "BudgetEntry",
                column: "BudgetCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_AccountId",
                table: "Transaction",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_BudgetCategoryId",
                table: "Transaction",
                column: "BudgetCategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BudgetEntry");

            migrationBuilder.DropTable(
                name: "Transaction");

            migrationBuilder.DropTable(
                name: "Account");

            migrationBuilder.DropTable(
                name: "BudgetCategory");

            migrationBuilder.DropTable(
                name: "CategoryGroup");
        }
    }
}
