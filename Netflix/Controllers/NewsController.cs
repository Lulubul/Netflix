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
    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsService;

        public NewsController(INewsService newsService)
        {
            _newsService = newsService;
        }

        // GET: api/<controller>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<News>), 200)]
        public async Task<IActionResult> GetNews([FromQuery]string userId, [FromQuery]string profileId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest($"Parameter is not defined in query {nameof(userId)}");
            }

            if (string.IsNullOrEmpty(profileId))
            {
                return BadRequest($"Parameter is not defined in query {nameof(profileId)}");
            }

            var news = await _newsService.GetNewsAsync(userId, profileId);
            return Ok(news);
        }
    }
}