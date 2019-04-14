using Microsoft.WindowsAzure.Storage.Table;

namespace Netflix.Repositories.AzureEntities
{
    public class TvSeriesEntity : TableEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Genres { get; set; }
        public string Image { get; set; }
    }
}
