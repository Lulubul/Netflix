using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Netflix.Domain.Models.MovieContext;
using Netflix.Domain.Models.SharedContext;

namespace Netflix.Services
{
    public interface IRecommendationsService
    {
        Task<List<Guid>> GetVideoRecommendationsByUser(Guid userId, Guid profileId);
    }

    public class RecommendationsService : AbstractService, IRecommendationsService
    {
        private readonly IHistoryService _historyService;
        private readonly IMovieService _movieService;

        public RecommendationsService(IHistoryService historyService, IMovieService movieService)
        {
            _historyService = historyService;
            _movieService = movieService;
        }

        public async Task<List<Guid>> GetVideoRecommendationsByUser(Guid userId, Guid profileId)
        {
            var historyItems = await _historyService.GetAllAsync(userId.ToString(), profileId.ToString());

            if (historyItems.Count() == 0)
            {
                return await Task.FromResult(new List<Guid>());
            }

            var userHistoryMovieIds = historyItems.Select((item) => item.WatchingItemId).ToArray();
            var userHistoryMovie = await _movieService.GetMoviesByIds(userHistoryMovieIds);
            var userPreferences = GetTopGenresAndReleaseYears(userHistoryMovie);
            var topGenres = userPreferences.MoviesByGenre.Select(x => x.Key).Take(2).ToArray();
            var movies = await _movieService.GetMoviesByGenreIds(topGenres);
            return movies
                .Where(movie => !userHistoryMovieIds.Contains(movie.Id.ToString()))
                .Select((movie) => movie.Id)
                .ToList();
        }

        private UserPreferences GetTopGenresAndReleaseYears(List<Movie> movies)
        {
            var moviesByGenreDictionary = new Dictionary<string, List<Movie>>();
            var moviesByReleaseYearDictionary = new Dictionary<string, List<Movie>>();

            foreach (var movie in movies)
            {
                if (!string.IsNullOrEmpty(movie.Genres))
                {
                    var genres = movie.Genres.Split(',').ToList();
                    genres.ForEach((genre) =>
                    {
                        if (moviesByGenreDictionary.ContainsKey(genre))
                        {
                            moviesByGenreDictionary[genre].Add(movie);
                        }
                        else
                        {
                            moviesByGenreDictionary.Add(genre, new List<Movie> { movie });
                        }
                    });
                }

                if (moviesByReleaseYearDictionary.ContainsKey(movie.ReleaseYear))
                {
                    moviesByReleaseYearDictionary[movie.ReleaseYear].Add(movie);
                }
                else
                {
                    moviesByReleaseYearDictionary.Add(movie.ReleaseYear, new List<Movie> { movie });
                }
            }
            return new UserPreferences(moviesByGenreDictionary, moviesByReleaseYearDictionary);
        }
    }
}



