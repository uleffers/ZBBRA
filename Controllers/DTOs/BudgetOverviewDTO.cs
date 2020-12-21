namespace ZBBRA.Controllers.DTOs
{
    /// <summary>
    /// DTO for the monthly budget overview 
    /// </summary>
    public class BudgetOverviewDTO
    {
        /// <summary>
        /// Income registered in the month
        /// </summary>
        public decimal Income { get; set; }
        
        /// <summary>
        /// Spent 
        /// </summary>
        public decimal Spent { get; set; }
        
        /// <summary>
        /// Total budgeted in the month
        /// </summary>
        public decimal Budgeted { get; set; }
        
        /// <summary>
        /// Remaining to be budgeted
        /// </summary>
        public decimal ToBeBudgeted { get; set; }
    }
}