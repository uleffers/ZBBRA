using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.Models
{
    /// <summary>
    /// Used to group the Categories into sub-groups
    /// </summary>
    [Table("CategoryGroup")]
    public class CategoryGroup
    {
        public CategoryGroup()
        {
            BudgetCategories = new HashSet<BudgetCategory>();
        }
        /// <summary>
        /// Category Group Id
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CategoryGroupId { get; set; }

        /// <summary>
        /// Index to defined sorting
        /// </summary>
        public int CategoryGroupIndex { get; set; }

        /// <summary>
        /// Name of the Category Group
        /// </summary>
        public string CategoryGroupName { get; set; }

        /// <summary>
        /// Containing Categories
        /// </summary>
        public virtual ICollection<BudgetCategory> BudgetCategories { get; set; }
    }
}