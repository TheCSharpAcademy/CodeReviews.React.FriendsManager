using FriendsManager.Domain.Entities;

namespace FriendsManager.Domain.Interfaces;

/// <summary>
/// Defines the contract for a service that manages <see cref="Category"/> entities.
/// </summary>
public interface ICategoryService
{
    Task CreateAsync(Category category);
    Task DeleteAsync(Category category);
    Task<IEnumerable<Category>> ReturnAsync();
    Task<Category?> ReturnAsync(Guid id);
    Task UpdateAsync(Category category);
}
