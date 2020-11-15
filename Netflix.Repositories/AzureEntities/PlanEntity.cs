using Microsoft.Azure.Cosmos.Table;

namespace Netflix.Repositories.AzureEntities
{
    public class PlanEntity: TableEntity
    {
        public bool CancelAnytime { get; set; }
        public bool HD { get; set; }
        public string Name { get; set; }
        public int NoScreens { get; set; }
        public bool UltraHD { get; set; }
        public double MonthlyPrice { get; set; }
    }
}
