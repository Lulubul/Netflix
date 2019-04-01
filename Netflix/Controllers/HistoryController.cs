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
        public async Task<IEnumerable<HistoryItem>> GetHistory(string userId)
        {
            var historyItems = await _historyService.GetAllAsync(userId);
            return historyItems;
        }

        // POST: api/<controller>
        [HttpPost]
        public async Task<bool> AddItemInHistory(HistoryItem historyItem)
        {
            return await _historyService.AddAsync(historyItem);
        }
    }
}