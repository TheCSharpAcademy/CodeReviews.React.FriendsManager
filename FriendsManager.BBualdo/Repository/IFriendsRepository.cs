using Contracts.DTO;
using Data.Models;

namespace Repository;

public interface IFriendsRepository : IRepository<Friend>
{
  Task<IEnumerable<FriendResDto>> GetFriendsAsync();
}