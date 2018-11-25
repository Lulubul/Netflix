using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using Netflix.Domain.Models;
using Netflix.Repositories.AzureEntities;

namespace Netflix.Repositories
{

    public interface IProfileRepository
    {
        Task<List<ProfileEntity>> GetUserProfiles(Guid userId);
    }

    public class ProfileRepository : IProfileRepository
    {
        private const string ProfilesTable = "profiles";
        private readonly string _storageConnectionString;

        public ProfileRepository(string storageConnectionString)
        {
            _storageConnectionString = storageConnectionString;
        }

        public async Task<List<ProfileEntity>> GetUserProfiles(Guid userId)
        {
            var query = new TableQuery<ProfileEntity>().Where(
                TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, userId.ToString())
            );
            var profiles = new List<ProfileEntity>();
            TableContinuationToken continuationToken = null;
            do
            {
                TableQuerySegment<ProfileEntity> querySegment = await GetTable().ExecuteQuerySegmentedAsync(query, continuationToken);
                continuationToken = querySegment.ContinuationToken;
                profiles.AddRange(querySegment.Results);
            }
            while (continuationToken != null);
            return profiles;
        }

        private CloudTable GetTable()
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(_storageConnectionString); ;
            CloudTableClient tableClient = storageAccount.CreateCloudTableClient();
            return tableClient.GetTableReference(ProfilesTable);
        }
    }
}
