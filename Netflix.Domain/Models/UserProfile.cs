﻿namespace Netflix.Domain.Models
{
    public class UserProfile : Entity
    {
        public string AvatarUrl { get; set; }
        public string Language { get; set; }
        public string Name { get; set; }
        public string MaturityLevel { get; set; }
    }
}
