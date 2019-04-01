using System;

namespace Netflix.Domain.Models.SharedContext
{
    public class HistoryItem: Entity
    {
        public string UserId;
        public string ItemId;
        public DateTime Date;
    }
}
