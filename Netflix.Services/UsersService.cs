using System;
using System.Threading.Tasks;
using Netflix.Domain.Models.UserContext;
using Netflix.Repositories;

namespace Netflix.Services
{
    public interface IUsersService
    {
        Task<User> Login(UserLogin userLogin);
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

        public async Task<User> Login(UserLogin userLogin)
        {
            return await _userRepository.Login(userLogin);
        }

        public async Task<bool> AddUser(UserRegister user)
        {
            return await _userRepository.AddUser(user);
        }

        public Task<bool> UpdateUser(User user)
        {
            throw new NotImplementedException();
        }
    }
}
