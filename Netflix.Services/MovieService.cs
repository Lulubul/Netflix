using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Netflix.Domain.Models;
using Netflix.Domain.Models.MovieContext;
using Netflix.Repositories;

namespace Netflix.Services
{
    public interface IMovieService
    {
        Task<List<Movie>> GetTopMoviesInCategories();
    }

    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _movieRepository;

        public MovieService(IMovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
        }

        public Task<List<Movie>> GetTopMoviesInCategories()
        {
            _movieRepository.GetMovies();
            throw new NotImplementedException();
        }
    }
}
