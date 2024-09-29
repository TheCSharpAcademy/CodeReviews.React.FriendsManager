using FriendsManager.Domain.Entities;
using FriendsManager.Infrastructure.Models;

namespace FriendsManager.Infrastructure.Extensions;

/// <summary>
/// Provides extension methods for mapping between the domain entity <see cref="Category"/> and
/// the infrastructure data model <see cref="CategoryModel"/>. 
/// </summary>
internal static class CategoryMappingExtensions
{
    internal static Category ToDomain(this CategoryModel model)
    {
        return new Category
        {
            Id = model.Id,
            Name = model.Name,
        };
    }

    internal static CategoryModel ToModel(this Category entity)
    {
        return new CategoryModel
        {
            Id = entity.Id,
            Name = entity.Name
        };
    }
}
