using System;
using System.Threading.Tasks;

namespace Netflix.Repositories
{
    public interface IWatchingItemRepository
    {
        Task GetWatchingListForUser(Guid userId);
    }

    public class WatchingItemRepository : IWatchingItemRepository
    {
        public Task GetWatchingListForUser(Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}
