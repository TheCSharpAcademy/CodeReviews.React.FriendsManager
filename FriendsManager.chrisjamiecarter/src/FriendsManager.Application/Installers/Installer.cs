using FriendsManager.Application.Services;
using FriendsManager.Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace FriendsManager.Application.Installers;

/// <summary>
/// Registers dependencies for the Application layer.
/// </summary>
public static class Installer
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<IFriendService, FriendService>();

        return services;
    }
}
