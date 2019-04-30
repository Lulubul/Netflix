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
        public async Task<IActionResult> Login(UserLogin userLogin)
        {
            if (userLogin == null)
            {
                return BadRequest($"Parameter is not defined in query {nameof(userLogin)}");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _usersService.Login(userLogin);
            if (user == null)
            {
                return Unauthorized();
            }
            return Ok(user);
        }

        // POST: api/<controller>
        [HttpPost]
        [Route("Register")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(User), 200)]
        public async Task<IActionResult> Register(UserRegister user)
        {
            if (user == null)
            {
                return BadRequest($"Parameter is not defined in query {nameof(UserRegister)}");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newUser = await _usersService.AddUser(user);
            return Ok(newUser);
        }

        // POST: api/<controller>
        [HttpPost]
        [Route("Logout")]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public Task<string> Logout(UserRegister user)
        {
            throw new NotImplementedException();
        }

        // Put: api/<controller>
        [HttpPut]
        public async Task<bool> UpdateUser(User user)
        {
            return await _usersService.UpdateUser(user);
        }
    }

}