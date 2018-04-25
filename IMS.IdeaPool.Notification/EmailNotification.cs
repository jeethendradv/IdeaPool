using RazorEngine;
using RazorEngine.Templating;
using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Reflection;
using System.Text;

namespace IMS.IdeaPool.Notification
{
    public class EmailNotification
    {
        public const string CONTENTSECTIONREPLACETOKEN = "##MESSAGEBODY##";
        public void SendSystemEmail<T>(EmailSettings settings, string templateName, T model)
        {
            if (settings.Tos.Count > 0)
            {
                dynamic template = this.GetEmailTemplate(templateName);
                string layoutBody = Engine.Razor.RunCompile(template.Layout as string, "_masterLayout", typeof(T), model);
                string emailBody = Engine.Razor.RunCompile(template.Template as string, templateName, typeof(T), model);

                emailBody = layoutBody.Replace(CONTENTSECTIONREPLACETOKEN, emailBody);
                emailBody = PreMailer.Net.PreMailer.MoveCssInline(emailBody, true).Html;
                Send(settings, emailBody);
            }
        }

        private void Send(EmailSettings settings, string messageBody)
        {            
            using (MailMessage message = new MailMessage())
            {
                message.From = new MailAddress(settings.From);
                foreach (string to in settings.Tos)
                {
                    message.To.Add(to);
                }
                message.Subject = settings.Subject;
                message.Body = messageBody;
                message.IsBodyHtml = true;
                NetworkCredential NetworkCred = new NetworkCredential(settings.UserName, settings.Password);
                SmtpClient smtp = new SmtpClient
                {
                    Host = settings.Host,
                    EnableSsl = settings.EnableSsl,
                    UseDefaultCredentials = true,
                    Credentials = NetworkCred,
                    Port = settings.Port
                };
                smtp.Send(message);
            }
        }

        /// <summary>
        /// Gets the email template.
        /// </summary>
        /// <param name="templateName">Name of the template.</param>
        /// <returns>Returns the e-mail template.</returns>
        private dynamic GetEmailTemplate(string templateName)
        {
            string masterTemplateContents = GetTemplateFileContents("_masterLayout.cshtml");
            string templateContents = GetTemplateFileContents(templateName + ".cshtml");

            return new { Layout = masterTemplateContents, Template = templateContents };
        }

        /// <summary>
        /// Gets the template file contents.
        /// </summary>
        /// <param name="templateFileName">The name of the template file.</param>
        /// <returns>Returns the contents of the template file.</returns>
        private string GetTemplateFileContents(string templateFileName)
        {
            return this.GetEmailFileContents("Templates", templateFileName);
        }

        /// <summary>
        /// Gets the email file contents.
        /// </summary>
        /// <param name="lastNamespaceToken">The last namespace token.</param>
        /// <param name="templateFileName">The name of the template file.</param>
        /// <returns>
        /// Returns the contents of the template file.
        /// </returns>
        private string GetEmailFileContents(string lastNamespaceToken, string templateFileName)
        {
            var assembly = Assembly.GetExecutingAssembly();
            if (assembly != null)
            {
                StringBuilder sb = new StringBuilder();
                using (StreamReader sr = new StreamReader(assembly.GetManifestResourceStream(String.Format("IMS.IdeaPool.Notification.{0}.{1}", lastNamespaceToken, templateFileName))))
                {
                    while (!sr.EndOfStream)
                    {
                        var line = sr.ReadLine();
                        if (!line.StartsWith("@model"))
                        {
                            sb.AppendLine(line);
                        }
                    }
                }
                return sb.ToString();
            }
            return null;
        }
    }
}
