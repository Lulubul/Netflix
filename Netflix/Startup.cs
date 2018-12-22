using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Netflix.Repositories;
using Netflix.Services;
using Swashbuckle.AspNetCore.Swagger;

namespace Netflix.Api
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

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddTransient<IMovieStreamService, MovieStreamService>();
            services.AddTransient<IMovieRepository>(m => new MovieRepository(Configuration.GetConnectionString("AzureBlobStorage")));
            services.AddTransient<IRecommendationsService, RecommendationsService>();
            services.AddTransient<INewsRepository, NewsRepository>();
            services.AddTransient<INewsService, NewsService>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IWatchingListService, WatchingListService>();
            services.AddTransient<IWatchingItemRepository, WatchingItemRepository>();
            services.AddTransient<IProfileService, ProfileService>();
            services.AddTransient<IGenresService, GenresService>();
            services.AddTransient<IMovieService, MovieService>();
            services.AddTransient<IGenresRepository>(m => new GenresRepository(azureTableStorage));
            services.AddTransient<IProfileRepository>(m => new ProfileRepository(azureTableStorage));

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Netflix API", Version = "v1" });
            });

            services.AddAutoMapper();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Netflix V1");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
