using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Netflix.Domain;
using Netflix.Domain.Models;
using Netflix.Domain.Models.MovieContext;

namespace Netflix.Repositories
{
    public interface INewsRepository
    {
        Task<List<News>> GetNews();
    }

    public class NewsRepository : INewsRepository
    {
        public Task<List<News>> GetNews()
        {
            throw new NotImplementedException();
        }
    }
}
