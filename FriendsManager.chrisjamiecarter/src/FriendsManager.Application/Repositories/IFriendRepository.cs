using FriendsManager.Domain.Entities;

namespace FriendsManager.Application.Repositories;

/// <summary>
/// Defines the contract for performing CRUD operations on <see cref="Friend"/> entities in the
/// data store.
/// </summary>
public interface IFriendRepository
{
    Task CreateAsync(Friend friend);
    Task DeleteAsync(Friend friend);
    Task<IEnumerable<Friend>> ReturnAsync();
    Task<Friend?> ReturnAsync(Guid id);
    Task UpdateAsync(Friend friend);
}
