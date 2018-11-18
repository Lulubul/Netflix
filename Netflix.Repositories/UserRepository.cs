using System;
using System.Threading.Tasks;
using Netflix.Domain;

namespace Netflix.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserById(Guid id);
    }

    public class UserRepository : IUserRepository
    {
        public Task<User> GetUserById(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
