using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Netflix.Domain.Models.MovieContext;
using Netflix.Repositories;
using Netflix.Repositories.AzureEntities;

namespace Netflix.Services
{
    public interface IMovieService
    {
        Task<List<Movie>> GetTopMoviesInCategories();
        Task<List<Movie>> GetMoviesByName(string name);
        Task<List<Movie>> GetMoviesByGenreName(string genreName);
        Task<List<Movie>> GetMoviesByGenreIds(string[] genreIds);
        Task<List<Movie>> GetMoviesByIds(string[] ids);
    }

    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _movieRepository;
        private readonly IGenresService _genreService;
        private readonly IMapper _mapper;

        public MovieService(IMovieRepository movieRepository, IGenresService genreService, IMapper mapper)
        {
            _movieRepository = movieRepository;
            _mapper = mapper;
            _genreService = genreService;
        }

        public async Task<List<Movie>> GetTopMoviesInCategories()
        {
            var movies = await _movieRepository.GetMovies();
            return movies.Select(_mapper.Map<MovieEntity, Movie>).ToList();
        }

        public async Task<List<Movie>> GetMoviesByName(string name)
        {
            var movies = await _movieRepository.GetMoviesByName(name);
            return movies.Select(_mapper.Map<MovieEntity, Movie>).ToList();
        }

        public async Task<List<Movie>> GetMoviesByGenreName(string genreName)
        {
            var genreFromDb = await _genreService.GetGenreByName(genreName);
            if (genreFromDb == null)
            {
                throw new KeyNotFoundException("Genre not found " + genreName);
            }
            return await GetMoviesByGenreIds(new string[] { genreFromDb.Id.ToString() });
        }

        public async Task<List<Movie>> GetMoviesByGenreIds(string[] genreIds)
        {
            var movies = await _movieRepository.GetMoviesByGenreIdsAsync(genreIds);
            return movies.Select(_mapper.Map<MovieEntity, Movie>).ToList();
        }

        public async Task<List<Movie>> GetMoviesByIds(string[] ids)
        {
            var movies = await _movieRepository.GetMoviesByIdsAsync(ids);
            return movies.Select(_mapper.Map<MovieEntity, Movie>).ToList();
        }
    }
}
