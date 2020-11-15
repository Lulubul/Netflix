using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos.Table;
using Netflix.Repositories.AzureEntities;

namespace Netflix.Repositories
{

    public interface IProfileRepository
    {
        Task<List<ProfileEntity>> GetUserProfiles(Guid userId);
        Task<bool> UpdateUserProfileAsync(ProfileEntity profile);
        Task<bool> AddUserProfile(ProfileEntity profile);
    }

    public class ProfileRepository : AbstractRepository, IProfileRepository
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
            var table = GetTable(ProfilesTable, _storageConnectionString);
            TableContinuationToken continuationToken = null;
            do
            {
                TableQuerySegment<ProfileEntity> querySegment = await table.ExecuteQuerySegmentedAsync(query, continuationToken);
                continuationToken = querySegment.ContinuationToken;
                profiles.AddRange(querySegment.Results);
            }
            while (continuationToken != null);
            return profiles;
        }

        public async Task<bool> UpdateUserProfileAsync(ProfileEntity profile)
        {
            TableOperation insertOrReplaceOperation = TableOperation.InsertOrReplace(profile);
            var table = GetTable(ProfilesTable, _storageConnectionString);
            await table.ExecuteAsync(insertOrReplaceOperation);
            return await Task.FromResult(true);
        }

        public async Task<bool> AddUserProfile(ProfileEntity newProfile)
        {
            TableOperation insertOperation = TableOperation.Insert(newProfile);
            var table = GetTable(ProfilesTable, _storageConnectionString);
            await table.ExecuteAsync(insertOperation);
            return await Task.FromResult(true);
        }
    }
}
