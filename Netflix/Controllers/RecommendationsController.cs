using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Netflix.Domain.Models.MovieContext;
using Netflix.Services;

namespace Netflix.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationsController : ControllerBase
    {
        private readonly IRecommendationsService _recommendationsService;

        public RecommendationsController(IRecommendationsService recommendationsService)
        {
            _recommendationsService = recommendationsService;
        }

        // GET: api/<controller>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Recommendation>), 200)]
        public async Task<IActionResult> GetVideoRecommendationsByUser([FromQuery]Guid? userId, [FromQuery]Guid? profileId)
        {
            if (userId == null)
            {
                return BadRequest($"Parameter is not defined in query {nameof(userId)}");
            }

            if (profileId == null)
            {
                return BadRequest($"Parameter is not defined in query {nameof(profileId)}");
            }

            var recommendations = await _recommendationsService.GetVideoRecommendationsByUser(userId.Value, profileId.Value);
            return Ok(recommendations);
        }
    }
}