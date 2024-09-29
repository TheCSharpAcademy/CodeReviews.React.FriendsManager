using FriendsManager.Application.Repositories;
using FriendsManager.Domain.Entities;
using FriendsManager.Domain.Interfaces;

namespace FriendsManager.Application.Services;

/// <summary>
/// Service class responsible for managing operations related to the <see cref="Friend"/> entity.
/// Provides methods for creating, updating, deleting, and retrieving data by interacting with the
/// underlying data repositories through the Unit of Work pattern.
/// </summary>
public class FriendService : IFriendService
{
    #region Fields

    private readonly IUnitOfWork _unitOfWork;

    #endregion
    #region Constructors

    public FriendService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    #endregion
    #region Methods

    public async Task CreateAsync(Friend friend)
    {
        await _unitOfWork.Friends.CreateAsync(friend);
        await _unitOfWork.SaveAsync();
    }

    public async Task DeleteAsync(Friend friend)
    {
        await _unitOfWork.Friends.DeleteAsync(friend);
        await _unitOfWork.SaveAsync();
    }

    public async Task<IEnumerable<Friend>> ReturnAsync()
    {
        return await _unitOfWork.Friends.ReturnAsync();
    }

    public async Task<Friend?> ReturnAsync(Guid id)
    {
        return await _unitOfWork.Friends.ReturnAsync(id);
    }

    public async Task UpdateAsync(Friend friend)
    {
        await _unitOfWork.Friends.UpdateAsync(friend);
        await _unitOfWork.SaveAsync();
    }

    #endregion
}
