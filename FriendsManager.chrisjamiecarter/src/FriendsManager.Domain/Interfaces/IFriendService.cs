using FriendsManager.Domain.Entities;

namespace FriendsManager.Domain.Interfaces;

/// <summary>
/// Defines the contract for a service that manages <see cref="Friend"/> entities.
/// </summary>
public interface IFriendService
{
    Task CreateAsync(Friend friend);
    Task DeleteAsync(Friend friend);
    Task<IEnumerable<Friend>> ReturnAsync();
    Task<Friend?> ReturnAsync(Guid id);
    Task UpdateAsync(Friend friend);
}
