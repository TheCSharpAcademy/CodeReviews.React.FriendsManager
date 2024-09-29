using FriendsManager.Application.Repositories;
using FriendsManager.Domain.Entities;
using FriendsManager.Infrastructure.Contexts;
using FriendsManager.Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Budget.Infrastructure.Repositories;

/// <summary>
/// Provides repository operations for managing the <see cref="Category"/> entity.
/// This class implements the <see cref="ICategoryRepository"/> interface, offering 
/// methods to perform CRUD operations against the database using Entity Framework Core.
/// </summary>
internal class CategoryRepository : ICategoryRepository
{
    #region Fields

    private readonly FriendsManagerDataContext _dataContext;

    #endregion
    #region Constructors

    public CategoryRepository(FriendsManagerDataContext dataContext)
    {
        _dataContext = dataContext;
    }

    #endregion
    #region Methods

    public async Task CreateAsync(Category entity)
    {
        await _dataContext.Category.AddAsync(entity.ToModel());
    }

    public async Task DeleteAsync(Category entity)
    {
        var model = await _dataContext.Category.FindAsync(entity.Id);
        if (model is not null)
        {
            _dataContext.Category.Remove(model);
        }
    }

    public async Task<IEnumerable<Category>> ReturnAsync()
    {
        var data = await _dataContext.Category.OrderBy(o => o.Name).ToListAsync();
        return data.Select(x => x.ToDomain());
    }

    public async Task<Category?> ReturnAsync(Guid id)
    {
        var model = await _dataContext.Category.FindAsync(id);
        return model?.ToDomain();
    }

    public async Task UpdateAsync(Category entity)
    {
        var model = await _dataContext.Category.FindAsync(entity.Id);
        if (model is not null)
        {
            model.Name = entity.Name;

            _dataContext.Category.Update(model);
        }
    }

    #endregion
}
