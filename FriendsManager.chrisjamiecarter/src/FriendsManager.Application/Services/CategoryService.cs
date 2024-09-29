using FriendsManager.Application.Repositories;
using FriendsManager.Domain.Entities;
using FriendsManager.Domain.Interfaces;

namespace FriendsManager.Application.Services;

/// <summary>
/// Service class responsible for managing operations related to the <see cref="Category"/> entity.
/// Provides methods for creating, updating, deleting, and retrieving data by interacting with the
/// underlying data repositories through the Unit of Work pattern.
/// </summary>
public class CategoryService : ICategoryService
{
    #region Fields

    private readonly IUnitOfWork _unitOfWork;

    #endregion
    #region Constructors

    public CategoryService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    #endregion
    #region Methods

    public async Task CreateAsync(Category category)
    {
        await _unitOfWork.Categories.CreateAsync(category);
        await _unitOfWork.SaveAsync();
    }

    public async Task DeleteAsync(Category category)
    {
        await _unitOfWork.Categories.DeleteAsync(category);
        await _unitOfWork.SaveAsync();
    }

    public async Task<IEnumerable<Category>> ReturnAsync()
    {
        return await _unitOfWork.Categories.ReturnAsync();
    }

    public async Task<Category?> ReturnAsync(Guid id)
    {
        return await _unitOfWork.Categories.ReturnAsync(id);
    }

    public async Task UpdateAsync(Category category)
    {
        await _unitOfWork.Categories.UpdateAsync(category);
        await _unitOfWork.SaveAsync();
    }

    #endregion
}
