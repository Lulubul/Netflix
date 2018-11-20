using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Netflix.Domain;
using Netflix.Services;

namespace Netflix.Api.Controllers
{
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
        public async Task<IActionResult> GetWatchingList([FromQuery]Guid? usedId)
        {
            if (usedId == null)
            {
                return BadRequest($"Parameter is not defined in query {nameof(usedId)}");
            }

            var watchingList = await _watchingListService.GetWatchingListForUser(usedId.Value);
            return Ok(watchingList);
        }
    }
}
