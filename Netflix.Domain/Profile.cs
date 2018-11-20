using System;
using System.Collections.Generic;
using System.Text;

namespace Netflix.Domain
{
    public class Profile : Entity
    {
        public MaturityLevel MaturityLevel { get; set; }
        public byte[] Avatar { get; set; }
    }
}
