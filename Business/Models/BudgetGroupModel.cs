using System.Collections.Generic;

namespace ZBBRA.Business.Models
{
    public class BudgetGroupModel
    {
        /// <summary>
        /// Name of the Category Group
        /// </summary>
        public string CategoryGroupName { get; set; }

        public List<BudgetEntrySpentModel> BudgetEntrySpentModels { get; set; }
    }
}