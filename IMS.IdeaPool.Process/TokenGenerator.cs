using System;
using System.Text;

namespace IMS.IdeaPool.Process
{
    internal static class TokenGenerator
    {
        private const int SIZE = 10;
        public static string Get()
        {
            Random random = new Random((int)DateTime.Now.Ticks);
            StringBuilder builder = new StringBuilder();
            char ch;
            for (int i = 0; i < SIZE; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }

            return builder.ToString();
        }
    }
}
