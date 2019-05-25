using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Netflix.Domain.Models.MovieContext;
using Netflix.Services;

namespace Netflix.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WatchingListController : ControllerBase
    {
        private readonly IWatchingListService _watchingListService;

        public WatchingListController(IWatchingListService watchingListService)
        {
            _watchingListService = watchingListService;
        }

        // GET: api/<controller>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<WatchingItem>), 200)]
        public async Task<IActionResult> GetWatchingList([FromQuery]Guid? userId, [FromQuery]Guid? profileId)
        {
            if (userId == null)
            {
                return BadRequest($"Parameter is not defined in query {nameof(userId)}");
            }

            if (profileId == null)
            {
                return BadRequest($"Parameter is not defined in query {nameof(profileId)}");
            }

            var watchingList = await _watchingListService.GetWatchingListForUser(userId.Value, profileId.Value);
            return Ok(watchingList);
        }
    }
}
