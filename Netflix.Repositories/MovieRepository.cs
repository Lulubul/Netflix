using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace Netflix.Repositories
{
    public interface IMovieRepository
    {
        Task<Stream> GetMovieByNameAsync(string name);
    }

    public class MovieRepository : IMovieRepository
    {
        private const string MoviesContainer = "movies";
        private readonly string _storageConnectionString;

        public MovieRepository(string storageConnectionString)
        {
            _storageConnectionString = storageConnectionString;
        }

        public async Task<Stream> GetMovieByNameAsync(string movieName)
        {
            try
            {
                return await GetContainer().GetBlobReference(movieName).OpenReadAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private CloudBlobContainer GetContainer()
        {
            var storageAccount = CloudStorageAccount.Parse(_storageConnectionString);
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            return blobClient.GetContainerReference(MoviesContainer);
        }
    }
}
