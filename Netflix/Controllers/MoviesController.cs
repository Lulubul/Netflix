using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Netflix.Controllers
{
    [Route("api/[controller]")]
    public class MoviesController : Controller
    {
        private readonly IVideoStreamService _streamingService;

        public MoviesController(IVideoStreamService streamingService)
        {
            _streamingService = streamingService;
        }

        // GET: api/<controller>
        [HttpGet]
        public async Task<IActionResult> GetVideoContentAsync()
        {
            //var data = Encoding.UTF8.GetBytes("This is a sample text from a binary array");
            //var entityTag = new EntityTagHeaderValue("\"MyCalculatedEtagValue\"");
            //return File(data, "text/plain", "downloadName.txt", lastModified: DateTime.UtcNow.AddSeconds(-5), entityTag: entityTag);
            var movieStream = await _streamingService.GetVideoByNameAsync("cosmos");
            return new FileStreamResult(movieStream, new MediaTypeHeaderValue("video/mp4").MediaType)
            {
                EnableRangeProcessing = true
            };
        }
    }
}
