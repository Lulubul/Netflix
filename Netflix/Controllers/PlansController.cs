using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Netflix.Domain.Models.UserContext;

namespace Netflix.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlansController : ControllerBase
    {
        // GET: api/<controller>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Plan>), 200)]
        public Task<IEnumerable<Plan>> GetPlans()
        {
            throw new NotImplementedException();
        }
    }
}