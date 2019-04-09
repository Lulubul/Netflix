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
    }

    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _movieRepository;
        private readonly IMapper _mapper;

        public MovieService(IMovieRepository movieRepository, IMapper mapper)
        {
            _movieRepository = movieRepository;
            _mapper = mapper;
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
    }
}
