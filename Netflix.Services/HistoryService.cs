using AutoMapper;
using Netflix.Domain.Models.SharedContext;
using Netflix.Repositories.AzureEntities;
using Netflix.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Netflix.Services
{
    public interface IHistoryService
    {
        Task<bool> AddAsync(HistoryItem historyItem);
        Task<IEnumerable<HistoryItem>> GetAllAsync(string userId, string profileId);
    }

    public class HistoryService : IHistoryService
    {
        private readonly IHistoryRepository _historyRepository;
        private readonly IMapper _mapper;

        public HistoryService(IHistoryRepository historyRepository, IMapper mapper)
        {
            _historyRepository = historyRepository;
            _mapper = mapper;
        }

        public async Task<bool> AddAsync(HistoryItem historyItem)
        {
            var historyEntity = _mapper.Map<HistoryItem, HistoryEntity>(historyItem);
            return await _historyRepository.AddAsync(historyEntity);
        }

        public async Task<IEnumerable<HistoryItem>> GetAllAsync(string userId, string profileId)
        {
            var historyEntities = await _historyRepository.GetAll(userId, profileId);
            return historyEntities.Select((entity) => _mapper.Map<HistoryEntity, HistoryItem>(entity)).ToArray();
        }
    }
}