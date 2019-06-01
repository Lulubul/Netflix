using Newtonsoft.Json;

namespace Netflix.Domain.Configuration
{
    public class AppSettings
    {
        [JsonIgnore]
        public string Secret { get; set; }

        public string HistoryUrl { get; set; }
        public string MoviesUrl { get; set; }
        public string NewsUrl { get; set; }
        public string ProfilesUrl { get; set; }
        public string RecommendationsUrl { get; set; }
        public string TvSeriesUrl { get; set; }
        public string UsersUrl { get; set; }
    }
}
