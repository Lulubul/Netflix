using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNet.Identity;
using Netflix.Domain.Models.UserContext;
using Netflix.Repositories;
using Netflix.Repositories.AzureEntities;

namespace Netflix.Services
{
    public interface IUsersService
    {
        Task<User> Login(UserLogin userLogin);
        Task<string> AddUser(UserRegister user);
        Task<bool> UpdateUser(User user);
    }

    public class UsersService : AbstractService, IUsersService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher _passwordHasher;

        public UsersService(IUserRepository userRepository, IMapper mapper, IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
        }

        public async Task<User> Login(UserLogin user)
        {
            var dbUser = await _userRepository.Login(user);
            if (dbUser == null)
            {
                return null;
            }
            if (_passwordHasher.VerifyHashedPassword(dbUser.Password, user.Password) == PasswordVerificationResult.Failed) {
                return null;
            }
            return _mapper.Map<UserEntity, User>(dbUser);
        }

        public async Task<string> AddUser(UserRegister user)
        {
            user.Password = _passwordHasher.HashPassword(user.Password);
            var newUser = _mapper.Map<UserRegister, UserEntity>(user);
            newUser.PartitionKey = Guid.NewGuid().ToString();
            newUser.RowKey = Guid.NewGuid().ToString();
            return await _userRepository.AddUser(newUser);
        }

        public Task<bool> UpdateUser(User user)
        {
            throw new NotImplementedException();
        }
    }
}
