using System;

namespace Netflix.Domain
{
    public class Recommendation : Entity
    {
        public byte MatchRate { get; set; }
        public Guid MovieId { get; set; }
    }
}
