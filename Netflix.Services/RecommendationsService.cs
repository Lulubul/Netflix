using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Netflix.Domain.Models.MovieContext;

namespace Netflix.Services
{
    public interface IRecommendationsService
    {
        Task<List<Recommendation>> GetVideoRecommendationsByUser(Guid userId, Guid profileId);
    }

    public class RecommendationsService : AbstractService, IRecommendationsService
    {
        private readonly IHistoryService _historyService;

        public RecommendationsService(IHistoryService historyService)
        {
            _historyService = historyService;
        }

        public async Task<List<Recommendation>> GetVideoRecommendationsByUser(Guid userId, Guid profileId)
        {
            var historyItems = await _historyService.GetAllAsync(userId.ToString(), profileId.ToString());
            return await Task.FromResult(new List<Recommendation>());
        }
    }
}
