using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Netflix.Domain.Models.MovieContext;
using Netflix.Repositories;

namespace Netflix.Services
{
    public interface IWatchingListService
    {
        Task<List<WatchingItem>> GetWatchingListForUser(Guid userId, Guid profileId);
    }

    public class WatchingListService : AbstractService, IWatchingListService
    {
        private readonly IWatchingItemRepository _watchingItemRepository;

        public WatchingListService(IWatchingItemRepository watchingItemRepository)
        {
            _watchingItemRepository = watchingItemRepository;
        }

        public Task<List<WatchingItem>> GetWatchingListForUser(Guid userId, Guid profileId)
        {
            return _watchingItemRepository.GetWatchingListForUser(userId, profileId);
        }
    }
}
