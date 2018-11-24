using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Netflix.Domain;
using Netflix.Domain.Models;

namespace Netflix.Repositories
{
    public interface IWatchingItemRepository
    {
        Task<List<WatchingItem>> GetWatchingListForUser(Guid userId);
    }

    public class WatchingItemRepository : IWatchingItemRepository
    {
        public Task<List<WatchingItem>> GetWatchingListForUser(Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}
