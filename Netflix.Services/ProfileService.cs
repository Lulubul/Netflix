using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Netflix.Domain.Models;
using Netflix.Repositories;
using Netflix.Repositories.AzureEntities;

namespace Netflix.Services
{

    public interface IProfileService
    {
        Task<List<UserProfile>> GetUserProfile(Guid userId);
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
    }
}
