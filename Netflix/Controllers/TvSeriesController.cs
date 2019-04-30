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
    public class TvSeriesController : ControllerBase
    {
        private readonly IMovieStreamService _streamingService;
        private readonly ITvSeriesService _tvSeriesService;

        public TvSeriesController(IMovieStreamService streamingService, ITvSeriesService movieService)
        {
            _streamingService = streamingService;
            _tvSeriesService = movieService;
        }

        // GET: api/<controller>
        [HttpGet]
        public async Task<IActionResult> GetAllTvSeries()
        {
            var movies = await _tvSeriesService.GetTopTvSeriesInCategories();
            return Ok(movies);
        }

        // GET: api/<controller>
        [HttpGet("search/{name}")]
        public async Task<IActionResult> GetTvSeriesByName(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest($"Parameter is not defined in query {nameof(name)}");
            }

            var movies = await _tvSeriesService.GetTvSeriesByName(name);
            return Ok(movies);
        }

        // GET: api/<controller>
        [HttpGet("genre/{name}")]
        public async Task<IActionResult> GetTvSeriesByGenre(string genre)
        {
            if (string.IsNullOrEmpty(genre))
            {
                return BadRequest($"Parameter is not defined in query {nameof(genre)}");
            }

            List<TvSeries> movies = null;
            try {
                movies = await _tvSeriesService.GetTvSeriesByGenre(genre);
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

            var movieStream = await _streamingService.GetMovieByNameAsync(name);
            return new FileStreamResult(movieStream, new MediaTypeHeaderValue("video/mp4").MediaType)
            {
                EnableRangeProcessing = true
            };
        }
    }
}
