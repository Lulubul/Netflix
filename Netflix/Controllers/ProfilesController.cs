using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Netflix.Domain.Models.UserContext;
using Netflix.Services;

namespace Netflix.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfilesController : ControllerBase
    { 
        private readonly IProfileService _profileService;

        public ProfilesController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        // GET: api/<controller>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<UserProfile>), 200)]
        public async Task<IActionResult> GetUserProfiles([FromQuery]Guid? userId)
        {
            if (userId == null)
            {
                return BadRequest($"Parameter is not defined in query {nameof(userId)}");
            }

            var profiles = await _profileService.GetUserProfile(userId.Value);
            return Ok(profiles);
        }

        // Post: api/<controller>
        [HttpPost]
        public async Task<IActionResult> CreateNewProfile([FromQuery]string userId, [FromBody]UserProfile profile)
        {
            if (userId == null)
            {
                return BadRequest($"Parameter is not defined in body {nameof(userId)}");
            }
            if (profile == null)
            {
                return BadRequest($"Parameter is not defined in body {nameof(profile)}");
            }

            var wasSuccessful = await _profileService.AddUserProfile(Guid.Parse(userId), profile);
            if (wasSuccessful)
            {
                return Ok(profile);
            }
            return BadRequest();
        }

        // Post: api/<controller>
        [HttpPut]
        public async Task<IActionResult> UpdateUserProfile([FromQuery]string userId, [FromBody]UserProfile profile)
        {
            if (userId == null)
            {
                return BadRequest($"Parameter is not defined in body {nameof(userId)}");
            }
            if (profile == null)
            {
                return BadRequest($"Parameter is not defined in body {nameof(profile)}");
            }

            var profiles = await _profileService.UpdateUserProfile(Guid.Parse(userId), profile);
            return Ok(profiles);
        }
    }
}