using Microsoft.Azure.Cosmos.Table;
using System;
using Netflix.Domain.Models.SharedContext;

namespace Netflix.Repositories.AzureEntities
{
    public class HistoryEntity : TableEntity
    {
        public string UserId { get; set; }
        public string ProfileId { get; set; }
        public string WatchingItemId { get; set; }
        public WatchingItemType WatchingItemType { get; set; }
        public DateTime Date { get; set; }
    }
}
