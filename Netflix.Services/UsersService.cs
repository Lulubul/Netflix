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
        Task<User> Logout(string email);
        Task<User> AddUser(UserRegister user);
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

        public async Task<User> AddUser(UserRegister user)
        {
            user.Password = _passwordHasher.HashPassword(user.Password);
            var newUser = _mapper.Map<UserRegister, UserEntity>(user);
            newUser.PartitionKey = Guid.NewGuid().ToString();
            user.Id = Guid.NewGuid();
            newUser.RowKey = user.Id.ToString();
            await _userRepository.AddUser(newUser);
            return _mapper.Map<UserRegister, User>(user);
        }

        public Task<bool> UpdateUser(User user)
        {
            throw new NotImplementedException();
        }

        public Task<User> Logout(string email)
        {
            throw new NotImplementedException();
        }
    }
}
