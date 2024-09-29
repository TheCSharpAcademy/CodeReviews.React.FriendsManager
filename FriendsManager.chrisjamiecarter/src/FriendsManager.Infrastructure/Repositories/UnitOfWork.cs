using FriendsManager.Application.Repositories;
using FriendsManager.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace FriendsManager.Infrastructure.Repositories;

/// <summary>
/// The UnitOfWork class provides a central point for managing database transactions and
/// saving changes across multiple repositories. It coordinates changes in 
/// <see cref="ICategoryRepository"/> and <see cref="IFriendRepository"/>.
/// </summary>
/// <remarks>
/// This class follows the Unit of Work design pattern, ensuring that all repository operations 
/// are treated as a single transaction, maintaining data consistency.
/// </remarks>
internal class UnitOfWork : IUnitOfWork
{
    #region Fields

    private readonly FriendsManagerDataContext _dataContext;

    #endregion
    #region Constructors

    public UnitOfWork(FriendsManagerDataContext dataContext, ICategoryRepository categoryRepository, IFriendRepository friendRepository)
    {
        _dataContext = dataContext;
        Categories = categoryRepository;
        Friends = friendRepository;
    }

    #endregion
    #region Properties

    public ICategoryRepository Categories { get; set; }

    public IFriendRepository Friends { get; set; }

    #endregion
    #region Methods

    public async Task<int> SaveAsync()
    {
        try
        {
            return await _dataContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            throw;
        }
    }

    #endregion
}
