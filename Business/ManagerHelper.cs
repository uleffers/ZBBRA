using System;
using System.Net.Http;

namespace ZBBRA.Business
{
    /// <summary>
    /// Helpers for the manager classes
    /// </summary>
    public class ManagerHelper
    {
        /// <summary>
        /// Verifies that the year and month are valid
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <exception cref="HttpRequestException"></exception>
        public static void VerifyMonthAndYear(int month, int year)
        {
            if (month < 1 || month > 12)
            {
                throw new HttpRequestException("Invalid month");
            }
            
            if (year < 1000 || year > 9999)
            {
                throw new HttpRequestException("Invalid year");
            }
        }

        /// <summary>
        /// Gets the first day of the next month
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        public static DateTime GetNextMonth(int month, int year)
        {
            return month == 12 ? new DateTime(year + 1, 1, 1) : new DateTime(year, month + 1, 1);
        }

        /// <summary>
        /// Gets the first day of this month
        /// </summary>
        /// <param name="month"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        public static DateTime GetThisMonth(int month, int year)
        {
            return new DateTime(year, month, 1);
        }
    }
}