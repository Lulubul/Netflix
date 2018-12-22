namespace Netflix.Domain.Models.MovieContext
{
    public class Movie
    {
        public string Name { get; set; }
        public MaturityLevel MaturityLevel { get; set; }
        public byte[] Image { get; set; }
    }
}
