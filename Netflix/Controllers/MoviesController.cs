using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Netflix.Domain.Models.MovieContext;
using Netflix.Services;

namespace Netflix.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController: ControllerBase
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
        [HttpGet("search/{name}")]
        public async Task<IActionResult> GetMoviesByName(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest($"Parameter is not defined in query {nameof(name)}");
            }

            var movies = await _movieService.GetMoviesByName(name);
            return Ok(movies);
        }

        // GET: api/<controller>
        [HttpGet("genre/{name}")]
        public async Task<IActionResult> GetMoviesByGenre(string genre)
        {
            if (string.IsNullOrEmpty(genre))
            {
                return BadRequest($"Parameter is not defined in query {nameof(genre)}");
            }

            List<Movie> movies = null;
            try {
                movies = await _movieService.GetMoviesByGenreName(genre);
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }
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

            var movieStream = await _streamingService.GetMovieByNameAsync("cosmos");
            return new FileStreamResult(movieStream, new MediaTypeHeaderValue("video/mp4").MediaType)
            {
                EnableRangeProcessing = true
            };
        }
    }
}
