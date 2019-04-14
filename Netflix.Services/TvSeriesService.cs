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
    public interface ITvSeriesService
    {
        Task<List<TvSeries>> GetTopTvSeriesInCategories();
        Task<List<TvSeries>> GetTvSeriesByName(string name);
        Task<List<TvSeries>> GetTvSeriesByGenre(string genre);
    }

    public class TvSeriesService : ITvSeriesService
    {
        private readonly ITvSeriesRepository _tvSeriesRepository;
        private readonly IGenresService _genreService;
        private readonly IMapper _mapper;

        public TvSeriesService(ITvSeriesRepository movieRepository, IGenresService genreService, IMapper mapper)
        {
            _tvSeriesRepository = movieRepository;
            _mapper = mapper;
            _genreService = genreService;
        }

        public async Task<List<TvSeries>> GetTopTvSeriesInCategories()
        {
            var tvSeries = await _tvSeriesRepository.GetTvSeries();
            return tvSeries.Select(_mapper.Map<TvSeriesEntity, TvSeries>).ToList();
        }

        public async Task<List<TvSeries>> GetTvSeriesByName(string name)
        {
            var tvSeries = await _tvSeriesRepository.GetTvSeriesByName(name);
            return tvSeries.Select(_mapper.Map<TvSeriesEntity, TvSeries>).ToList();
        }

        public async Task<List<TvSeries>> GetTvSeriesByGenre(string genre)
        {
            var genreFromDb = await _genreService.GetGenreByName(genre);
            if (genreFromDb == null)
            {
                throw new KeyNotFoundException("Genre not found " + genre);
            }
            var tvSeries = await _tvSeriesRepository.GetTvSeriesByGenre(genreFromDb.Id.ToString());
            return tvSeries.Select(_mapper.Map<TvSeriesEntity, TvSeries>).ToList();
        }
    }
}
