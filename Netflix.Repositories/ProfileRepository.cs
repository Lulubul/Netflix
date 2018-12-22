using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Table;
using Netflix.Domain.Models;
using Netflix.Domain.Models.UserContext;
using Netflix.Repositories.AzureEntities;

namespace Netflix.Repositories
{

    public interface IProfileRepository
    {
        Task<List<ProfileEntity>> GetUserProfiles(Guid userId);
        Task<bool> UpdateUserProfile(Guid userId, UserProfile profile);
        Task<bool> AddUserProfile(Guid userId, UserProfile profile);
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

        public Task<bool> UpdateUserProfile(Guid userId, UserProfile profile)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AddUserProfile(Guid userId, UserProfile profile)
        {
            throw new NotImplementedException();
        }
    }
}
