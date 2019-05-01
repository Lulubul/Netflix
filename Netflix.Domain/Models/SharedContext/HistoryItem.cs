using System;
using System.ComponentModel.DataAnnotations;

namespace Netflix.Domain.Models.SharedContext
{
    public class HistoryItem: Entity
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public string ProfileId { get; set; }
        [Required]
        public string WatchingItemId { get; set; }
        [Required]
        public WatchingItemType WatchingItemType { get; set; }
        public DateTime Date { get; set; }
    }

    public enum WatchingItemType
    {
        TvSeries,
        Movies
    }
}
