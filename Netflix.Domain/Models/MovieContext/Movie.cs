﻿namespace Netflix.Domain.Models.MovieContext
{
    public class Movie: Entity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Duration { get; set; }
        public string Image { get; set; }
        public string Genres { get; set; }
        public string VideoId { get; set; }
    }
}
