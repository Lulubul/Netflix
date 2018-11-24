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

        public async Task<Stream> GetMovieByNameAsync(string movieName)
        {
            try
            {
                var storageAccount = CloudStorageAccount.DevelopmentStorageAccount;
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = blobClient.GetContainerReference(MoviesContainer);
                return await container.GetBlobReference(movieName).OpenReadAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
