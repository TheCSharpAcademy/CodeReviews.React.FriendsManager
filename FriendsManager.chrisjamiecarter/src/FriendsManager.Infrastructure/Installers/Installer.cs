using Budget.Infrastructure.Repositories;
using FriendsManager.Application.Repositories;
using FriendsManager.Infrastructure.Contexts;
using FriendsManager.Infrastructure.Repositories;
using FriendsManager.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FriendsManager.Infrastructure.Installers;

/// <summary>
/// Registers dependencies and seeds data for the Infrastructure layer.
/// </summary>
public static class Installer
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfigurationRoot configuration)
    {
        var connectionString = configuration.GetConnectionString("FriendsManager") ?? throw new InvalidOperationException("Connection string 'FriendsManager' not found");

        services.AddDbContext<FriendsManagerDataContext>(options =>
        {
            options.UseSqlServer(connectionString);
        });

        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<IFriendRepository, FriendRepository>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<ISeederService, SeederService>();

        return services;
    }

    public static IServiceProvider SeedDatabase(this IServiceProvider serviceProvider)
    {
        var context = serviceProvider.GetRequiredService<FriendsManagerDataContext>();
        context.Database.Migrate();

        var seeder = serviceProvider.GetRequiredService<ISeederService>();
        seeder.SeedDatabase();

        return serviceProvider;
    }
}
