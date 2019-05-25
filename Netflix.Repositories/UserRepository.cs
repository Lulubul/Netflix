using System;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Table;
using Netflix.Domain.Models.UserContext;
using Netflix.Repositories.AzureEntities;

namespace Netflix.Repositories
{
    public interface IUserRepository
    {
        Task<UserEntity> Login(UserLogin login);
        Task<UserEntity> GetUserById(Guid id);
        Task<string> AddUser(UserEntity user);
    }

    public class UserRepository : AbstractRepository, IUserRepository
    {
        public string TableName = "Users";
        private readonly string _storageConnectionString;

        public UserRepository(string storageConnectionString)
        {
            _storageConnectionString = storageConnectionString;
        }

        public Task<UserEntity> GetUserById(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<UserEntity> Login(UserLogin user)
        {
            var query = new TableQuery<UserEntity>()
                .Where(TableQuery.GenerateFilterCondition("Email", QueryComparisons.Equal, user.Email)).Take(1);

            var table = GetTable(TableName, _storageConnectionString);
            TableContinuationToken continuationToken = null;
            var result = await table.ExecuteQuerySegmentedAsync(query, continuationToken);
            if (result == null || result.Results.Count == 0)
            {
                return null;
            }
            return result.Results[0];
        }

        public async Task<string> AddUser(UserEntity newUser)
        {
            TableOperation insertOperation = TableOperation.Insert(newUser);
            var table = GetTable(TableName, _storageConnectionString);
            await table.ExecuteAsync(insertOperation);
            return await Task.FromResult(newUser.RowKey);
        }
    }
}
