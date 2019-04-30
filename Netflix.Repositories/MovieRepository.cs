using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Table;
using Netflix.Repositories.AzureEntities;

namespace Netflix.Repositories
{
    public interface IMovieRepository
    {
        Task<Stream> GetMovieByNameAsync(string name);
        Task<List<MovieEntity>> GetMovies();
        Task<List<MovieEntity>> GetMoviesByName(string name);
        Task<List<MovieEntity>> GetMoviesByGenre(string genreId);
    }

    public class MovieRepository : AbstractRepository, IMovieRepository
    {
        private const string MoviesContainer = "movies";
        private readonly string _storageConnectionString;

        public MovieRepository(string storageConnectionString)
        {
            _storageConnectionString = storageConnectionString;
        }

        public async Task<List<MovieEntity>> GetMovies()
        {
            var table = GetTable(MoviesContainer, _storageConnectionString);
            var movies = new List<MovieEntity>();
            TableContinuationToken continuationToken = null;
            do
            {
                var querySegment = await table.ExecuteQuerySegmentedAsync(new TableQuery<MovieEntity>(), continuationToken);
                continuationToken = querySegment.ContinuationToken;
                movies.AddRange(querySegment.Results);
            }
            while (continuationToken != null);
            return movies;
        }

        public async Task<List<MovieEntity>> GetMoviesByName(string name)
        {
            var table = GetTable(MoviesContainer, _storageConnectionString);
            var movies = await GetMovies();
            var wordsInName = name.Split(' ');
            return movies
                .Where((movie) => movie.Name.Contains(name) || wordsInName.Any((word) => movie.Name.Contains(word)))
                .ToList();
        }

        public async Task<List<MovieEntity>> GetMoviesByGenre(string genreId)
        {
            var table = GetTable(MoviesContainer, _storageConnectionString);
            var movies = await GetMovies();
            return movies.Where((movie) => movie.Genres.Split(',').Contains(genreId)).ToList();
        }

        public async Task<Stream> GetMovieByNameAsync(string movieName)
        {
            return await GetContainer(_storageConnectionString, MoviesContainer)
                .GetBlobReference(movieName)
                .OpenReadAsync();
        }
    }
}
