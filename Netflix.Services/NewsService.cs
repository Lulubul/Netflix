using System.Collections.Generic;
using System.Threading.Tasks;
using Netflix.Domain;
using Netflix.Repositories;

namespace Netflix.Services
{
    public interface INewsService
    {
        Task<List<News>> GetNewsAsync();
    }

    public class NewsService : AbstractService, INewsService
    {
        private readonly INewsRepository _newsRepository;

        public NewsService(INewsRepository newsRepository)
        {
            _newsRepository = newsRepository;
        }

        public Task<List<News>> GetNewsAsync()
        {
            return _newsRepository.GetNews();
        }
    }
}
