using Microsoft.WindowsAzure.Storage.Table;
using Netflix.Repositories.AzureEntities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Netflix.Repositories
{
    public interface IHistoryRepository
    {
        Task<bool> AddAsync(HistoryEntity historyEntity);
        Task<List<HistoryEntity>> GetAll(string userId, string profileId);
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
            var insertOperation = TableOperation.Insert(historyEntity);
            var table = GetTable(HistoryTable, _storageConnectionString);
            await table.ExecuteAsync(insertOperation);
            return await Task.FromResult(true);
        }

        public async Task<List<HistoryEntity>> GetAll(string userId, string profileId)
        {
            var table = GetTable(HistoryTable, _storageConnectionString);

            var query = new TableQuery<UserEntity>()
                .Where(TableQuery.GenerateFilterCondition("UserId", QueryComparisons.Equal, userId))
                ;

            var history = new List<HistoryEntity>();


            TableContinuationToken continuationToken = null;
            do
            {
                var querySegment = await table.ExecuteQuerySegmentedAsync(new TableQuery<HistoryEntity>(), continuationToken);
                continuationToken = querySegment.ContinuationToken;
                history.AddRange(querySegment.Results);
            }
            while (continuationToken != null);
            return history.ToList();
        }
    }
}