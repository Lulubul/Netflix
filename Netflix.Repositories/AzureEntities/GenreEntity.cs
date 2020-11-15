using Microsoft.Azure.Cosmos.Table;

namespace Netflix.Repositories.AzureEntities
{
    public class GenreEntity: TableEntity
    {
        public string Name { get; set; }
    }
}
