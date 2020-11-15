using Microsoft.Azure.Cosmos.Table;
using Azure.Storage.Blobs;

namespace Netflix.Repositories
{
    public abstract class AbstractRepository
    {
        protected CloudTable GetTable(string table, string storageConnectionString)
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(storageConnectionString);
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();
            return tableClient.GetTableReference(table);
        }

        protected BlobContainerClient GetContainer(string storageConnectionString, string container)
        {
            return new BlobContainerClient(storageConnectionString, container);
        }
    }
}
