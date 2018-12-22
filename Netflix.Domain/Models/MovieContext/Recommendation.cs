using System;

namespace Netflix.Domain.Models.MovieContext
{
    public class Recommendation : Entity
    {
        public byte MatchRate { get; set; }
        public Guid MovieId { get; set; }
    }
}
