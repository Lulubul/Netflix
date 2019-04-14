using System;
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
        Task<List<Movie>> GetMoviesByGenre(string genre);
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

        public async Task<List<Movie>> GetMoviesByGenre(string genre)
        {
            var genreFromDb = await _genreService.GetGenreByName(genre);
            if (genreFromDb == null)
            {
                throw new KeyNotFoundException("Genre not found " + genre);
            }
            var movies = await _movieRepository.GetMoviesByGenre(genreFromDb.Id.ToString());
            return movies.Select(_mapper.Map<MovieEntity, Movie>).ToList();
        }
    }
}
