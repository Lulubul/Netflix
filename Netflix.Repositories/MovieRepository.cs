using System;
using System.IO;
using System.Threading.Tasks;

namespace Netflix.Repositories
{
    public interface IMovieRepository
    {
        Task<Stream> GetMovieByNameAsync(string name);
        Task GetMovies();
    }

    public class MovieRepository : AbstractRepository, IMovieRepository
    {
        private const string MoviesContainer = "movies";
        private readonly string _storageConnectionString;

        public MovieRepository(string storageConnectionString)
        {
            _storageConnectionString = storageConnectionString;
        }

        public Task GetMovies()
        {
            return Task.CompletedTask;
        }

        public async Task<Stream> GetMovieByNameAsync(string movieName)
        {
            return await GetContainer(_storageConnectionString, MoviesContainer).GetBlobReference(movieName).OpenReadAsync();
        }
    }
}
