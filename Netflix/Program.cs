using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace Netflix
{
    public class Program
    {
        public static void Main(string[] args)
        {
            AppContext.SetSwitch("Switch.Microsoft.AspNetCore.Mvc.EnableRangeProcessing", true);
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
