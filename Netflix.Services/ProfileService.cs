using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Netflix.Domain.Models;
using Netflix.Domain.Models.UserContext;
using Netflix.Repositories;
using Netflix.Repositories.AzureEntities;

namespace Netflix.Services
{

    public interface IProfileService
    {
        Task<List<UserProfile>> GetUserProfile(Guid userId);
        Task<bool> UpdateUserProfile(Guid userId, UserProfile profile);
        Task<bool> AddUserProfile(Guid userId, UserProfile profile);
    }

    public class ProfileService : AbstractService, IProfileService
    {
        private readonly IProfileRepository _profileRepository;
        private readonly IMapper _mapper;

        public ProfileService(IProfileRepository profileRepository, IMapper mapper)
        {
            _profileRepository = profileRepository;
            _mapper = mapper;
        }

        public async Task<List<UserProfile>> GetUserProfile(Guid userId)
        {
            var profiles = await _profileRepository.GetUserProfiles(userId);
            return profiles.Select(_mapper.Map<ProfileEntity, UserProfile>).ToList();
        }

        public async Task<bool> UpdateUserProfile(Guid userId, UserProfile profile)
        {
            var updateResponse = await _profileRepository.UpdateUserProfile(userId, profile);
            return updateResponse;
        }

        public async Task<bool> AddUserProfile(Guid userId, UserProfile profile)
        {
            var addResponse = await _profileRepository.AddUserProfile(userId, profile);
            return addResponse;
        }
    }
}
