using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
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
        Task<User> AddUser(UserRegister user);
        Task<bool> UpdateUser(User user);
    }

    public class UsersService : AbstractService, IUsersService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IJwtTokenService _jwtTokenService;

        public UsersService(IUserRepository userRepository, IMapper mapper, IPasswordHasher passwordHasher, IJwtTokenService jwtTokenService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
            _jwtTokenService = jwtTokenService;
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

            var userModel = _mapper.Map<UserEntity, User>(dbUser);
            userModel.Token = _jwtTokenService.CreateToken(userModel.Id.ToString());
            return userModel;
        }

        public async Task<User> AddUser(UserRegister user)
        {
            user.Password = _passwordHasher.HashPassword(user.Password);
            var newUser = _mapper.Map<UserRegister, UserEntity>(user);
            newUser.PartitionKey = Guid.NewGuid().ToString();
            user.Id = Guid.NewGuid();
            newUser.RowKey = user.Id.ToString();
            await _userRepository.AddUser(newUser);

            var userModel = _mapper.Map<UserRegister, User>(user);
            userModel.Token = _jwtTokenService.CreateToken(userModel.Id.ToString());
            return userModel;
        }

        public Task<bool> UpdateUser(User user)
        {
            throw new NotImplementedException();
        }
    }
}
