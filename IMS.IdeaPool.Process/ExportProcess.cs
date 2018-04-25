using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using IMS.IdeaPool.Process.Exceptions;
using IMS.IdeaPool.Process.Interfaces;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Linq;

namespace IMS.IdeaPool.Process
{
    internal class ExportProcess : IExportProcess
    {
        private const string EXCEL_CONTENT_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        private IIdeasData ideaData;

        internal ExportProcess(IIdeasData ideaData)
        {
            this.ideaData = ideaData;
        }

        public ExportResult Export(ExportCriteria criteria, int loggedInUserId)
        {
            if (criteria.ExportType != "excel")
            {
                throw new CustomException("Invalid export type.");
            }
            IdeaSearchResults results = ideaData.GetAll(criteria, loggedInUserId);
            return new ExportResult
            {
                ResultBytes = ExportExcel(results),
                ContentType = EXCEL_CONTENT_TYPE,
                FileName = "Ideas.xlsx"
            };
        }

        private byte[] ExportExcel(IdeaSearchResults searchresults)
        {
            byte[] result = null;
            using (ExcelPackage package = new ExcelPackage())
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("Ideas");
                SetHeaders(worksheet);
                int rowNumber = 2;
                foreach (IdeaDataObject idea in searchresults.Results)
                {
                    worksheet.Cells[rowNumber, 1].Value = idea.CreateDate.ToShortDateString();
                    worksheet.Cells[rowNumber, 2].Value = string.Format("{0}, {1}", idea.User.FirstName, idea.User.LastName);
                    worksheet.Cells[rowNumber, 3].Value = idea.Title;
                    worksheet.Cells[rowNumber, 4].Value = string.Join("\n", idea.FieldOfWater.Select(x => x.Name).ToList());
                    worksheet.Cells[rowNumber, 4].Style.WrapText = true;
                    worksheet.Cells[rowNumber, 5].Value = idea.Status.Name;
                    rowNumber = rowNumber + 1;
                }
                worksheet.Cells.AutoFitColumns();
                result = package.GetAsByteArray();
            }
            return result;
        }

        private void SetHeaders(ExcelWorksheet worksheet)
        {
            worksheet.Cells[1, 1].Value = "Submit Date";
            worksheet.Cells[1, 2].Value = "Name";
            worksheet.Cells[1, 3].Value = "Title";
            worksheet.Cells[1, 4].Value = "Field Of Water";
            worksheet.Cells[1, 5].Value = "Status";

            using (ExcelRange range = worksheet.Cells[1, 1, 1, 5])
            {
                range.Style.Fill.PatternType = ExcelFillStyle.Solid;
                range.Style.Fill.BackgroundColor.SetColor(System.Drawing.ColorTranslator.FromHtml("#1fb5ad"));
            }
        }
    }
}
