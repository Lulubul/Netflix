using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Netflix.Domain;
using Netflix.Repositories;

namespace Netflix.Services
{
    public interface IWatchingListService
    {
        Task<List<WatchingItem>> GetWatchingListForUser(Guid userId);
    }

    public class WatchingListService : AbstractService, IWatchingListService
    {
        private readonly WatchingItemRepository _watchingItemRepository;

        public WatchingListService(WatchingItemRepository watchingItemRepository)
        {
            _watchingItemRepository = watchingItemRepository;
        }

        public Task<List<WatchingItem>> GetWatchingListForUser(Guid userId)
        {
            return _watchingItemRepository.GetWatchingListForUser(userId);
        }
    }
}
