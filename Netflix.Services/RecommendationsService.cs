using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Netflix.Domain;
using Netflix.Domain.Models;
using Netflix.Domain.Models.MovieContext;

namespace Netflix.Services
{
    public interface IRecommendationsService
    {
        Task<List<Recommendation>> GetVideoRecommendationsByUser(Guid userId);
    }

    public class RecommendationsService : AbstractService, IRecommendationsService
    {
        public async Task<List<Recommendation>> GetVideoRecommendationsByUser(Guid userId)
        {
            return await Task.FromResult(new List<Recommendation>());
        }
    }
}
