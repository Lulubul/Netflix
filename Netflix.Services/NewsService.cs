using System.Collections.Generic;
using System.Threading.Tasks;
using Netflix.Domain;
using Netflix.Domain.Models;
using Netflix.Domain.Models.MovieContext;
using Netflix.Repositories;

namespace Netflix.Services
{
    public interface INewsService
    {
        Task<List<News>> GetNewsAsync(string userid);
    }

    public class NewsService: AbstractService, INewsService
    {
        private readonly INewsRepository _newsRepository;
        private readonly IHistoryService _historyService;

        public NewsService(INewsRepository newsRepository)
        {
            _newsRepository = newsRepository;
        }

        public Task<List<News>> GetNewsAsync(string userid)
        {
            return _newsRepository.GetNews();
        }
    }
}
