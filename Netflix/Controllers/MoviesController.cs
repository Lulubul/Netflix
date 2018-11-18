using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Netflix.Services;

namespace Netflix.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieStreamService _streamingService;

        public MoviesController(IMovieStreamService streamingService)
        {
            _streamingService = streamingService;
        }

        // GET: api/<controller>
        [HttpGet]
        [ProducesResponseType(typeof(FileStreamResult), 200)]
        public async Task<IActionResult> GetMoviesContentAsync([FromQuery]string name = "cosmos")
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest($"Parameter is not defined in query {nameof(name)}");
            }

            var movieStream = await _streamingService.GetMovieByNameAsync(name);
            return new FileStreamResult(movieStream, new MediaTypeHeaderValue("video/mp4").MediaType)
            {
                EnableRangeProcessing = true
            };
        }
    }
}
