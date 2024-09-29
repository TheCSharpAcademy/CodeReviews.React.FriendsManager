namespace FriendsManager.Application.Repositories;

/// <summary>
/// Represents a unit of work pattern interface for coordinating changes across multiple repositories in the Application.
/// </summary>
public interface IUnitOfWork
{
    ICategoryRepository Categories { get; set; }
    IFriendRepository Friends { get; set; }
    Task<int> SaveAsync();
}
