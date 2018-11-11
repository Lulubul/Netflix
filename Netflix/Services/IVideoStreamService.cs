using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace Netflix.Controllers
{
    public interface IVideoStreamService
    {
        Task<Stream> GetVideoByNameAsync(string name);
    }

    public class VideoStreamService : IVideoStreamService
    {
        private const string MoviesContainer = "movies";

        public async Task<Stream> GetVideoByNameAsync(string name)
        {
            try
            {
                CloudStorageAccount storageAccount = CloudStorageAccount.DevelopmentStorageAccount;
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = blobClient.GetContainerReference(MoviesContainer);
                return await container.GetBlobReference($"{name}.mp4").OpenReadAsync();
            }
            catch (Exception ex)
            {
                Trace.WriteLine(ex);
                return null;
            }
        }
    }
}