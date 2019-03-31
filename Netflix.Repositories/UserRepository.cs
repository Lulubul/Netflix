using System;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Table;
using Netflix.Domain.Models;
using Netflix.Domain.Models.UserContext;
using Netflix.Repositories.AzureEntities;

namespace Netflix.Repositories
{
    public interface IUserRepository
    {
        Task<User> Login(UserLogin login);
        Task<User> GetUserById(Guid id);
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

        public Task<User> GetUserById(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<User> Login(UserLogin login)
        {
            throw new NotImplementedException();
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
