using FriendsManager.Application.Repositories;
using FriendsManager.Domain.Entities;
using FriendsManager.Infrastructure.Contexts;
using FriendsManager.Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;

namespace FriendsManager.Infrastructure.Repositories;

/// <summary>
/// Provides repository operations for managing the <see cref="Friend"/> entity.
/// This class implements the <see cref="IFriendRepository"/> interface, offering 
/// methods to perform CRUD operations against the database using Entity Framework Core.
/// </summary>
internal class FriendRepository : IFriendRepository
{
    #region Fields

    private readonly FriendsManagerDataContext _dataContext;

    #endregion
    #region Constructors

    public FriendRepository(FriendsManagerDataContext dataContext)
    {
        _dataContext = dataContext;
    }

    #endregion
    #region Methods

    public async Task CreateAsync(Friend entity)
    {
        var model = entity.ToModel();
        var category = await _dataContext.Category.FindAsync(model.CategoryId);
        ArgumentNullException.ThrowIfNull(category);

        model.Category = category;
        await _dataContext.Friend.AddAsync(model);
    }

    public async Task DeleteAsync(Friend entity)
    {
        var model = await _dataContext.Friend.FindAsync(entity.Id);
        if (model is not null)
        {
            _dataContext.Friend.Remove(model);
        }
    }

    public async Task<IEnumerable<Friend>> ReturnAsync()
    {
        var data = await _dataContext.Friend.Include(f => f.Category).OrderBy(o => o.Name).ToListAsync();
        return data.Select(x => x.ToDomain());
    }

    public async Task<Friend?> ReturnAsync(Guid id)
    {
        var model = await _dataContext.Friend.FindAsync(id);

        if (model is not null && model.Category is null)
        {
            var category = await _dataContext.Category.FindAsync(model.CategoryId);
            if (category is not null)
            {
                model.Category = category;
            }
        }

        return model?.ToDomain();
    }

    public async Task UpdateAsync(Friend entity)
    {
        var model = await _dataContext.Friend.FindAsync(entity.Id);
        if (model is not null)
        {
            model.Name = entity.Name;
            model.DesiredContactFrequency = entity.DesiredContactFrequency;
            model.LastContactDate = entity.LastContactDate;
            model.LastContactType = entity.LastContactType;
            model.CategoryId = entity.Category.Id;

            _dataContext.Friend.Update(model);
        }
    }

    #endregion
}
