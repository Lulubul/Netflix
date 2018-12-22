using AutoMapper;
using Netflix.Domain.Models;
using Netflix.Domain.Models.MovieContext;
using Netflix.Domain.Models.UserContext;
using Netflix.Repositories.AzureEntities;

namespace Netflix.Services
{
    public class DomainProfile : Profile
    {
        public DomainProfile()
        {
            CreateMap<ProfileEntity, UserProfile>();
            CreateMap<NewsEntity, News>();
            CreateMap<GenreEntity, Genre>()
                .ForMember(x => x.Id, opt => opt.MapFrom(x => x.RowKey));
        }
    }
}
