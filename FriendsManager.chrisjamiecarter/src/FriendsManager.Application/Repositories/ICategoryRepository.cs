using FriendsManager.Domain.Entities;

namespace FriendsManager.Application.Repositories;

/// <summary>
/// Defines the contract for performing CRUD operations on <see cref="Category"/> entities in the
/// data store.
/// </summary>
public interface ICategoryRepository
{
    Task CreateAsync(Category category);
    Task DeleteAsync(Category category);
    Task<IEnumerable<Category>> ReturnAsync();
    Task<Category?> ReturnAsync(Guid id);
    Task UpdateAsync(Category category);
}
