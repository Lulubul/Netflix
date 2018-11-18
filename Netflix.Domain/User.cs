using System;

namespace Netflix.Domain
{
    public class User : Entity
    {
        public string Name { get; set; }
        public MaturityLevel MaturityLevel { get; set; }
        public byte[] Avatar { get; set; }
    }
}
