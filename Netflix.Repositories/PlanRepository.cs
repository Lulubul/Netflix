using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos.Table;
using Netflix.Repositories.AzureEntities;

namespace Netflix.Repositories
{
    public interface IPlanRepository
    {
        Task<List<PlanEntity>> GetAllPlans();
    }

    public class PlanRepository : AbstractRepository, IPlanRepository
    {
        public string TableName = "Plans";
        private readonly string _storageConnectionString;

        public PlanRepository(string storageConnectionString)
        {
            _storageConnectionString = storageConnectionString;
        }

        public async Task<List<PlanEntity>> GetAllPlans()
        {
            var table = GetTable(TableName, _storageConnectionString);
            var plans = new List<PlanEntity>();
            TableContinuationToken continuationToken = null;
            do
            {
                var querySegment = await table.ExecuteQuerySegmentedAsync(new TableQuery<PlanEntity>(), continuationToken);
                continuationToken = querySegment.ContinuationToken;
                plans.AddRange(querySegment.Results);
            }
            while (continuationToken != null);
            return plans;
        }

        
    }
}
