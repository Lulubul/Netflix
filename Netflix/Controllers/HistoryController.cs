using System;
using Microsoft.AspNetCore.Mvc;
using Netflix.Domain.Models.SharedContext;
using Netflix.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Netflix.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoryController : ControllerBase
    {
        private readonly IHistoryService _historyService;

        public HistoryController(IHistoryService historyService)
        {
            _historyService = historyService;
        }

        // GET: api/<controller>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<HistoryItem>), 200)]
        public async Task<IActionResult> GetHistory([FromQuery]string userId, [FromQuery]string profileId)
        {
            if (userId == null)
            {
                return BadRequest($"Parameter is not defined in query {nameof(userId)}");
            }

            if (profileId == null)
            {
                return BadRequest($"Parameter is not defined in query {nameof(profileId)}");
            }

            var historyItems = await _historyService.GetAllAsync(userId, profileId);
            return Ok(historyItems);
        }

        // POST: api/<controller>
        [HttpPost]
        public async Task<IActionResult> AddItemInHistory([FromBody]HistoryItem historyItem)
        {
            if (historyItem == null)
            {
                return BadRequest($"Parameter is not defined in query {nameof(historyItem)}");
            }
            return Ok(await _historyService.AddAsync(historyItem));
        }
    }
}