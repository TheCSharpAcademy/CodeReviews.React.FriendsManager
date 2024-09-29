using FriendsManager.Domain.Entities;
using FriendsManager.Infrastructure.Models;

namespace FriendsManager.Infrastructure.Extensions;

/// <summary>
/// Provides extension methods for mapping between the domain entity <see cref="Friend"/> and
/// the infrastructure data model <see cref="FriendModel"/>. 
/// </summary>
internal static class FriendMappingExtensions
{
    internal static Friend ToDomain(this FriendModel model)
    {
        return new Friend
        {
            Id = model.Id,
            Name = model.Name,
            DesiredContactFrequency = model.DesiredContactFrequency,
            LastContactDate = model.LastContactDate,
            LastContactType = model.LastContactType,
            Category = model.Category.ToDomain(),
        };
    }

    internal static FriendModel ToModel(this Friend entity)
    {
        return new FriendModel
        {
            Id = entity.Id,
            Name = entity.Name,
            DesiredContactFrequency = entity.DesiredContactFrequency,
            LastContactDate = entity.LastContactDate,
            LastContactType = entity.LastContactType,
            CategoryId = entity.Category.Id,
            Category = entity.Category.ToModel(),
        };
    }
}
