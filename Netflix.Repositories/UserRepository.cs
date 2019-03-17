using System;
using System.Threading.Tasks;
using Netflix.Domain.Models;
using Netflix.Domain.Models.UserContext;

namespace Netflix.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserById(Guid id);
        Task<bool> AddUser(UserRegister user);
    }

    public class UserRepository : IUserRepository
    {
        public Task<User> GetUserById(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AddUser(UserRegister user)
        {
            throw new NotImplementedException();
        }
    }
}
