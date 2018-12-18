using System;
using System.Collections.Generic;
using System.Text;

namespace Netflix.Domain.Models
{
    public class Genre: Entity
    {
        public string Name { get; set; }
        public MaturityLevel MaturityLevel { get; set; }
    }
}
