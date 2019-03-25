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
            CreateMap<ProfileEntity, UserProfile>()
                .ForMember(x => x.Id, opt => opt.MapFrom(x => x.RowKey));
            CreateMap<UserProfile, ProfileEntity>();
            CreateMap<UserLogin, UserEntity>();
            CreateMap<UserRegister, UserEntity>();
            CreateMap<NewsEntity, News>();
            CreateMap<PlanEntity, Plan>()
                .ForMember(x => x.Id, opt => opt.MapFrom(x => x.RowKey));
            CreateMap<GenreEntity, Genre>()
                .ForMember(x => x.Id, opt => opt.MapFrom(x => x.RowKey));
            CreateMap<MovieEntity, Movie>();
        }
    }
}
