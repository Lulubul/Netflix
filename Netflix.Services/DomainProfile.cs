using AutoMapper;
using Netflix.Domain.Models;
using Netflix.Repositories.AzureEntities;

namespace Netflix.Services
{
    public class DomainProfile : Profile
    {
        public DomainProfile()
        {
            CreateMap<ProfileEntity, UserProfile>();
            CreateMap<NewsEntity, News>();
        }
    }
}
