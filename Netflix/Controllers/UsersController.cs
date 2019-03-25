using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Netflix.Domain.Models.UserContext;
using Netflix.Services;

namespace Netflix.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        // GET: api/<controller>
        [HttpPost]
        [Route("Login")]
        [ProducesResponseType(typeof(User), 200)]
        public async Task<User> Login(UserLogin userLogin)
        {
            return await _usersService.Login(userLogin);
        }

        // POST: api/<controller>
        [HttpPost]
        [Route("Register")]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<string> Register(UserRegister user)
        {
            return await _usersService.AddUser(user);
        }

        // Put: api/<controller>
        [HttpPut]
        public async Task<bool> UpdateUser(User user)
        {
            return await _usersService.UpdateUser(user);
        }
    }

}