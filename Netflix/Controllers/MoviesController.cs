using System;
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
        private readonly IMovieService _movieService;

        public MoviesController(IMovieStreamService streamingService, IMovieService movieService)
        {
            _streamingService = streamingService;
            _movieService = movieService;
        }

        // GET: api/<controller>
        [HttpGet]
        public async Task<IActionResult> GetAllMovies()
        {
            var movies = await _movieService.GetTopMoviesInCategories();
            return Ok(movies);
        }

        // GET: api/<controller>
        [HttpGet("{name}")]
        public async Task<IActionResult> GetMovieByNameAsync(string name)
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
