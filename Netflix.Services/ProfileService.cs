using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Netflix.Domain;

namespace Netflix.Services
{

    public interface IProfileService
    {
        Task<List<Profile>> GetUserProfile(Guid userId);
    }

    public class ProfileService : AbstractService, IProfileService
    {
        public Task<List<Profile>> GetUserProfile(Guid userId)
        {
            return Task.FromResult(new List<Profile>());
        }
    }
}
