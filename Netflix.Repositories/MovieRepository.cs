using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Table;
using Netflix.Repositories.AzureEntities;

namespace Netflix.Repositories
{
    public interface IMovieRepository
    {
        Task<Stream> GetMovieByNameAsync(string name);
        Task<List<MovieEntity>> GetMovies();
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

        public async Task<Stream> GetMovieByNameAsync(string movieName)
        {
            return await GetContainer(_storageConnectionString, MoviesContainer).GetBlobReference(movieName).OpenReadAsync();
        }
    }
}
