using System;
using System.Threading.Tasks;
using Netflix.Domain.Models.UserContext;
using Netflix.Repositories;

namespace Netflix.Services
{
    public interface IUsersService
    {
        Task<User> GetUserById(Guid id);
        Task<bool> AddUser(UserRegister user);
        Task<bool> UpdateUser(User user);
    }

    public class UsersService : AbstractService, IUsersService
    {
        private readonly IUserRepository _userRepository;

        public UsersService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> AddUser(UserRegister user)
        {
            return await _userRepository.AddUser(user);
        }

        public Task<bool> UpdateUser(User user)
        {
            throw new NotImplementedException();
        }

        public async Task<User> GetUserById(Guid id)
        {
            return await _userRepository.GetUserById(id);
        }
    }
}
