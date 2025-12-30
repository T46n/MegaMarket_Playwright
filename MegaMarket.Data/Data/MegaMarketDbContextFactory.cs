using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace MegaMarket.Data.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<MegaMarketDbContext>
    {
        public MegaMarketDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<MegaMarketDbContext>();

            var environmentName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";
            var basePath = FindAppSettingsBasePath();

            var configuration = new ConfigurationBuilder()
                .SetBasePath(basePath)
                .AddJsonFile("appsettings.json", optional: false)
                .AddJsonFile($"appsettings.{environmentName}.json", optional: true)
                .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");
            if (string.IsNullOrWhiteSpace(connectionString))
                throw new InvalidOperationException("Connection string 'DefaultConnection' was not found.");

            builder.UseSqlServer(connectionString, x => x.MigrationsAssembly("MegaMarket.Data"));

            return new MegaMarketDbContext(builder.Options);
        }

        private static string FindAppSettingsBasePath()
        {
            var current = Directory.GetCurrentDirectory();
            while (!string.IsNullOrWhiteSpace(current))
            {
                var apiDir = Path.Combine(current, "MegaMarket.API");
                if (File.Exists(Path.Combine(apiDir, "appsettings.json")))
                    return apiDir;

                if (File.Exists(Path.Combine(current, "appsettings.json")))
                    return current;

                current = Directory.GetParent(current)?.FullName;
            }

            return Directory.GetCurrentDirectory();
        }
    }
}
