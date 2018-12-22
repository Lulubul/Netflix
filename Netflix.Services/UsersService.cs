using System;
using System.Threading.Tasks;
using Netflix.Domain.Models;
using Netflix.Domain.Models.UserContext;
using Netflix.Repositories;

namespace Netflix.Services
{
    public interface IUsersService
    {
        Task<User> GetUserById(Guid id);
        Task<bool> AddUser(User user);
    }

    public class UsersService : AbstractService, IUsersService
    {
        private readonly IUserRepository _userRepository;

        public UsersService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> AddUser(User user)
        {
            return await _userRepository.AddUser(user);
        }

        public async Task<User> GetUserById(Guid id)
        {
            return await _userRepository.GetUserById(id);
        }
    }
}
