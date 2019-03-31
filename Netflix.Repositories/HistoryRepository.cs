using Microsoft.WindowsAzure.Storage.Table;
using Netflix.Repositories.AzureEntities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Netflix.Repositories
{
    public interface IHistoryRepository
    {
        Task<bool> AddAsync(HistoryEntity historyEntity);
        Task<List<HistoryEntity>> GetAll(string userId);
    }

    public class HistoryRepository : AbstractRepository, IHistoryRepository
    {
        private const string HistoryTable = "history";
        private readonly string _storageConnectionString;

        public HistoryRepository(string storageConnectionString)
        {
            _storageConnectionString = storageConnectionString;
        }

        public async Task<bool> AddAsync(HistoryEntity historyEntity)
        {
            TableOperation insertOperation = TableOperation.Insert(historyEntity);
            var table = GetTable(HistoryTable, _storageConnectionString);
            await table.ExecuteAsync(insertOperation);
            return await Task.FromResult(true);
        }

        public Task<List<HistoryEntity>> GetAll(string userId)
        {
            throw new System.NotImplementedException();
        }
    }
}