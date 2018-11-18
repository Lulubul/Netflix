using System;
using System.Threading.Tasks;
using Netflix.Repositories;

namespace Netflix.Services
{
    public interface IWatchingListService
    {
        Task GetWatchingListForUser(Guid userId);
    }

    public class WatchingListService : IWatchingListService
    {
        private readonly WatchingItemRepository _watchingItemRepository;

        public WatchingListService(WatchingItemRepository watchingItemRepository)
        {
            _watchingItemRepository = watchingItemRepository;
        }

        public Task GetWatchingListForUser(Guid userId)
        {
            return _watchingItemRepository.GetWatchingListForUser(userId);
        }
    }
}
