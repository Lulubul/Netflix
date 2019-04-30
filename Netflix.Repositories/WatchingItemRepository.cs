using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Netflix.Domain.Models.MovieContext;

namespace Netflix.Repositories
{
    public interface IWatchingItemRepository
    {
        Task<List<WatchingItem>> GetWatchingListForUser(Guid userId, Guid profileId);
    }

    public class WatchingItemRepository : IWatchingItemRepository
    {
        public Task<List<WatchingItem>> GetWatchingListForUser(Guid userId, Guid profileId)
        {
            throw new NotImplementedException();
        }
    }
}
