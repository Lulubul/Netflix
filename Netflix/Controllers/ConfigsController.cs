using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Netflix.Domain.Configuration;

namespace Netflix.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigsController : ControllerBase
    {
        private readonly IOptionsSnapshot<AppSettings> _settings;

        public ConfigsController(IOptionsSnapshot<AppSettings> settings)
        {
            _settings = settings;
        }

        [HttpGet]
        public AppSettings Configuration()
        {
            return _settings.Value;
        }
    }
}
