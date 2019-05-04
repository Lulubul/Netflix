using Microsoft.WindowsAzure.Storage.Table;
using Netflix.Repositories.AzureEntities;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Netflix.Repositories
{
    public interface ITvSeriesRepository
    {
        Task<Stream> GetTvSeriesByNameAsync(string name);
        Task<List<TvSeriesEntity>> GetTvSeries();
        Task<List<TvSeriesEntity>> GetTvSeriesByName(string name);
        Task<List<TvSeriesEntity>> GetTvSeriesByGenre(string genreId);
    }

    public class TvSeriesRepository: AbstractRepository, ITvSeriesRepository
    {
        private const string TvSeriesContainer = "tvSeries";
        private readonly string _storageConnectionString;

        public TvSeriesRepository(string storageConnectionString)
        {
            _storageConnectionString = storageConnectionString;
        }

        public async Task<List<TvSeriesEntity>> GetTvSeries()
        {
            var table = GetTable(TvSeriesContainer, _storageConnectionString);
            var tvSeries = new List<TvSeriesEntity>();
            TableContinuationToken continuationToken = null;
            do
            {
                var querySegment = await table.ExecuteQuerySegmentedAsync(new TableQuery<TvSeriesEntity>(), continuationToken);
                continuationToken = querySegment.ContinuationToken;
                tvSeries.AddRange(querySegment.Results);
            }
            while (continuationToken != null);
            return tvSeries;
        }

        public async Task<List<TvSeriesEntity>> GetTvSeriesByGenre(string genreId)
        {
            var tvSeries = await GetTvSeries();
            return tvSeries.Where((item) => !string.IsNullOrEmpty(item.Genres) && item.Genres.Split(',').Contains(genreId)).ToList();
        }

        public async Task<List<TvSeriesEntity>> GetTvSeriesByName(string name)
        {
            var tvSeries = await GetTvSeries();
            var wordsInName = name.Split(' ');
            return tvSeries
                .Where((movie) => movie.Name.Contains(name) || wordsInName.Any((word) => movie.Name.Contains(word)))
                .ToList();
        }

        public async Task<Stream> GetTvSeriesByNameAsync(string name)
        {
            return await GetContainer(_storageConnectionString, TvSeriesContainer)
                .GetBlobReference(name)
                .OpenReadAsync();
        }
    }
}