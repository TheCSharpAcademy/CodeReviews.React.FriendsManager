using Contracts.DTO;
using Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using ModelExtensions;

namespace Repository;

public class FriendsRepository(FriendsDbContext dbContext) : Repository<Friend>(dbContext), IFriendsRepository
{
  private readonly FriendsDbContext _dbContext = dbContext;

  public async Task<IEnumerable<FriendResDto>> GetFriendsAsync()
  {
    var friends = await _dbContext.Friends
      .Include(f => f.Category)
      .ToListAsync();

    return friends.Select(f => f.ToFriendResponse()).ToList();
  }
}