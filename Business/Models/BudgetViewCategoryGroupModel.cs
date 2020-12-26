using System.Collections.Generic;

namespace ZBBRA.Business.Models
{
    public class BudgetViewCategoryGroupModel
    {
        /// <summary>
        /// Name of the Category Group
        /// </summary>
        public string CategoryGroupName { get; set; }

        public List<BudgetViewCategoryModel> BudgetEntrySpentModels { get; set; }
    }
}