using AutoMapper;
using Netflix.Domain.Models.MovieContext;
using Netflix.Domain.Models.SharedContext;
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
            CreateMap<UserRegister, User>();
            CreateMap<UserEntity, User>()
                 .ForMember(x => x.Id, opt => opt.MapFrom(x => x.RowKey))
                 .ForMember(x => x.Token, opt => opt.Ignore());
            CreateMap<NewsEntity, News>();
            CreateMap<PlanEntity, Plan>()
                .ForMember(x => x.Id, opt => opt.MapFrom(x => x.RowKey));
            CreateMap<GenreEntity, Genre>()
                .ForMember(x => x.Id, opt => opt.MapFrom(x => x.RowKey));
            CreateMap<MovieEntity, Movie>()
                .ForMember(x => x.Id, opt => opt.MapFrom(x => x.RowKey));
            CreateMap<TvSeriesEntity, TvSeries>()
                .ForMember(x => x.Id, opt => opt.MapFrom(x => x.RowKey));
            CreateMap<HistoryEntity, HistoryItem>()
                 .ForMember(x => x.Id, opt => opt.MapFrom(x => x.RowKey));
            CreateMap<HistoryItem, HistoryEntity>();
        }
    }
}
