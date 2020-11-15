using AutoMapper;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Netflix.Repositories;
using Netflix.Services;

namespace Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var azureTableStorage = Configuration.GetConnectionString("AzureTableStorage");
            var azureBlobStorage = Configuration.GetConnectionString("AzureBlobStorage");

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Api", Version = "v1" });
            });

            services.AddTransient<IMovieStreamService, MovieStreamService>();
            services.AddTransient<IRecommendationsService, RecommendationsService>();
            services.AddTransient<INewsRepository, NewsRepository>();
            services.AddTransient<INewsService, NewsService>();
            services.AddTransient<IUsersService, UsersService>();
            services.AddTransient<IWatchingListService, WatchingListService>();
            services.AddTransient<IWatchingItemRepository, WatchingItemRepository>();
            services.AddTransient<IProfileService, ProfileService>();
            services.AddTransient<IGenresService, GenresService>();
            services.AddTransient<IMovieService, MovieService>();
            services.AddTransient<IHistoryService, HistoryService>();
            services.AddTransient<IPlanService, PlansService>();
            services.AddTransient<IPasswordHasher, PasswordHasher>();
            services.AddTransient<ITvSeriesService, TvSeriesService>();
            services.AddTransient<IJwtTokenService, JwtTokenService>();

            services.AddTransient<IMovieRepository>(m => new MovieRepository(azureBlobStorage));
            services.AddTransient<IUserRepository>(m => new UserRepository(azureTableStorage));
            services.AddTransient<IPlanRepository>(m => new PlanRepository(azureTableStorage));
            services.AddTransient<IGenresRepository>(m => new GenresRepository(azureTableStorage));
            services.AddTransient<IProfileRepository>(m => new ProfileRepository(azureTableStorage));
            services.AddTransient<IHistoryRepository>(m => new HistoryRepository(azureTableStorage));
            services.AddTransient<ITvSeriesRepository>(m => new TvSeriesRepository(azureTableStorage));

            services.AddAutoMapper(this.GetType().Assembly);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Api v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
