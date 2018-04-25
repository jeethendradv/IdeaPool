using System;
using System.Collections.Generic;

namespace IMS.IdeaPool.DataObjects
{
    public class SearchResults : PagerSettings
    {
        public SearchResults(int totalcount, int pagelength)
        {
            TotalCount = totalcount;
            PageLength = pagelength;
            TotalPages = CalculateNumberofPages(totalcount);
        }
        public List<object> Rows { get; set; }

        private int CalculateNumberofPages(int totalcount)
        {
            int numberofpages = 1;
            if (totalcount > PageLength)
            {
                int remainder;
                int quotient = Math.DivRem(totalcount, PageLength, out remainder);
                numberofpages = quotient + (remainder != 0 ? 1 : 0);
            }
            return numberofpages;
        }
    }
}
