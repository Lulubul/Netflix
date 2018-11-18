using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Netflix.Domain;

namespace Netflix.Services
{
    public interface IRecommendationsService
    {
        Task<List<Recommendation>> GetVideoRecommendationsByUser(Guid userId);
    }

    public class RecommendationsService : IRecommendationsService
    {
        public async Task<List<Recommendation>> GetVideoRecommendationsByUser(Guid userId)
        {
            return await Task.FromResult(new List<Recommendation>());
        }
    }
}
