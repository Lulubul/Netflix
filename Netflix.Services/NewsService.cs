using System.Collections.Generic;
using System.Threading.Tasks;
using Netflix.Domain.Models.MovieContext;
using Netflix.Repositories;

namespace Netflix.Services
{
    public interface INewsService
    {
        Task<List<News>> GetNewsAsync(string userId, string profileId);
    }

    public class NewsService: AbstractService, INewsService
    {
        private readonly INewsRepository _newsRepository;
        private readonly IHistoryService _historyService;

        public NewsService(INewsRepository newsRepository, IHistoryService historyService)
        {
            _newsRepository = newsRepository;
            _historyService = historyService;
        }

        public Task<List<News>> GetNewsAsync(string userId, string profileId)
        {
            var historyItem = _historyService.GetAllAsync(userId, profileId);
            return _newsRepository.GetNews();
        }
    }
}
