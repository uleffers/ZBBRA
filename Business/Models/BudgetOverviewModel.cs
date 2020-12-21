namespace ZBBRA.Business.Models
{
    /// <summary>
    /// Budget overview 
    /// </summary>
    public class BudgetOverviewModel
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