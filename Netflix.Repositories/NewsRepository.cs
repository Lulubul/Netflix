using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Netflix.Domain;
using Netflix.Domain.Models;

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
