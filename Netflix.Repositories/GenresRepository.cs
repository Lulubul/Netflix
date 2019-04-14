using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Table;
using Netflix.Repositories.AzureEntities;

namespace Netflix.Repositories
{

    public interface IGenresRepository
    {
        Task<List<GenreEntity>> GetAllGenres();
        Task<GenreEntity> GetGenreByName(string name);
    }

    public class GenresRepository: AbstractRepository, IGenresRepository
    {
        private const string TableName = "genres";
        private readonly string _storageConnectionString;

        public GenresRepository(string storageConnectionString)
        {
            _storageConnectionString = storageConnectionString;
        }

        public async Task<List<GenreEntity>> GetAllGenres()
        {
            var table = GetTable(TableName, _storageConnectionString);
            var genres = new List<GenreEntity>();
            TableContinuationToken continuationToken = null;
            do
            {
                var querySegment = await table.ExecuteQuerySegmentedAsync(new TableQuery<GenreEntity>(), continuationToken);
                continuationToken = querySegment.ContinuationToken;
                genres.AddRange(querySegment.Results);
            }
            while (continuationToken != null);
            return genres;
        }

        public async Task<GenreEntity> GetGenreByName(string name)
        {
            var query = new TableQuery<GenreEntity>().Where(TableQuery.GenerateFilterCondition("Name", QueryComparisons.Equal, name)).Take(1);
            var table = GetTable(TableName, _storageConnectionString);
            TableContinuationToken continuationToken = null;
            var result = await table.ExecuteQuerySegmentedAsync(query, continuationToken);
            return result?.Results[0];
        }
    }
}
