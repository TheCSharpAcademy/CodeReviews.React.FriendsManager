using Contracts.DTO;
using Data.Models;

namespace Contracts;

public interface IFriendsService
{
  Task<IEnumerable<FriendResDto>> GetFriendsAsync();
  Task<Friend?> GetFriendByIdAsync(int id);
  Task AddFriendAsync(FriendReqDto friend);
  Task UpdateFriendAsync(FriendUpdateDto friend);
  Task DeleteFriendAsync(Friend friend);
}