using Contracts;
using Contracts.DTO;
using Data.Models;
using ModelExtensions;
using Repository;

namespace Services;

public class FriendsService(IFriendsRepository friendsRepository) : IFriendsService
{
  private readonly IFriendsRepository _friendsRepository = friendsRepository;
  
  public async Task<IEnumerable<FriendResDto>> GetFriendsAsync()
  {
    return await _friendsRepository.GetFriendsAsync();
  }

  public async Task<Friend?> GetFriendByIdAsync(int id)
  {
    return await _friendsRepository.GetByIdAsync(id);
  }

  public async Task AddFriendAsync(FriendReqDto friend)
  {
    await _friendsRepository.AddAsync(friend.ToFriend());
  }

  public async Task UpdateFriendAsync(FriendUpdateDto friend)
  {
    await _friendsRepository.UpdateAsync(friend.ToFriend());
  }

  public async Task DeleteFriendAsync(Friend friend)
  {
    await _friendsRepository.DeleteAsync(friend);
  }
}