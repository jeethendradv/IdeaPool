using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace IMS.IdeaPool.Process
{
    public static class IGenProtector
    {
        // DO NOT CHANGE THE KEY AND IV
        private const string KEY = "25IMSgsArwenPlac";
        private const string IV = "25ArwenPlaceEast";

        private static readonly byte[] KEY_BYTES;
        private static readonly byte[] IV_BYTES;

        static IGenProtector()
        {
            KEY_BYTES = GetBytes(KEY);
            IV_BYTES = GetBytes(IV);
        }

        public static string Encrypt(string password)
        {
            string encryptedString = string.Empty;
            byte[] passwordBytes = GetBytes(password);
            using (Aes algo = Aes.Create())
            {
                using (ICryptoTransform encryptor = algo.CreateEncryptor(KEY_BYTES, IV_BYTES))
                {
                    byte[] encryptedBytes = Crypt(passwordBytes, encryptor);
                    encryptedString = Convert.ToBase64String(encryptedBytes);
                }
            }

            return encryptedString;
        }

        public static string Decrypt(string encryptedPassword)
        {
            string decryptedString = string.Empty;
            try
            {
                byte[] passwordBytes = Convert.FromBase64String(encryptedPassword);
                using (Aes algo = Aes.Create())
                {
                    using (ICryptoTransform decryptor = algo.CreateDecryptor(KEY_BYTES, IV_BYTES))
                    {
                        byte[] decryptedBytes = Crypt(passwordBytes, decryptor);
                        decryptedString = Encoding.ASCII.GetString(decryptedBytes);
                    }
                }
            }
            catch { }

            return decryptedString;
        }

        private static byte[] Crypt(byte[] data, ICryptoTransform cryptor)
        {
            var memorystream = new MemoryStream();
            using (Stream cs = new CryptoStream(memorystream, cryptor, CryptoStreamMode.Write))
            {
                cs.Write(data, 0, data.Length);
            }
            return memorystream.ToArray();
        }

        private static byte[] GetBytes(string value)
        {
            return Encoding.ASCII.GetBytes(value);
        }
    }
}
