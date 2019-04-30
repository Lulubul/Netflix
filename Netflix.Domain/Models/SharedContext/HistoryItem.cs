using System;

namespace Netflix.Domain.Models.SharedContext
{
    public class HistoryItem: Entity
    {
        public string UserId { get; set; }
        public string ProfileId { get; set; }
        public string WatchingItemId { get; set; }
        public DateTime Date { get; set; }
    }
}
