using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Netflix.Domain.Models.UserContext;
using Netflix.Repositories;
using Netflix.Repositories.AzureEntities;

namespace Netflix.Services
{
    public interface IPlanService 
    {
        Task<List<Plan>> GetAllPlans();
    }

    public class PlansService : AbstractService, IPlanService
    {
        private readonly IPlanRepository _repository;
        private readonly IMapper _mapper;

        public PlansService(IPlanRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<Plan>> GetAllPlans()
        {
            var plans = await _repository.GetAllPlans();
            return plans.Select(_mapper.Map<PlanEntity, Plan>).OrderBy(x => x.MonthlyPrice).ToList();
        }
    }
}
