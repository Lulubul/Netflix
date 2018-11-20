using System.IO;
using System.Threading.Tasks;
using Netflix.Repositories;

namespace Netflix.Services
{
    public interface IMovieStreamService
    {
        Task<Stream> GetMovieByNameAsync(string name);
    }

    public class MovieStreamService : AbstractService, IMovieStreamService
    {
        private readonly IMovieRepository _movieRepository;

        public MovieStreamService(IMovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
        }

        public async Task<Stream> GetMovieByNameAsync(string name)
        {
            return await _movieRepository.GetMovieByNameAsync(name);
        }
    }
}