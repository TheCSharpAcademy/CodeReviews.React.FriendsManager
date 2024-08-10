using Contracts.DTO;
using Data.Models;

namespace ModelExtensions;

public static class FriendExtensions
{
    public static FriendResDto ToFriendResponse(this Friend friend)
    {
      return new FriendResDto
      {
        Id = friend.Id,
        FirstName = friend.FirstName,
        LastName = friend.LastName,
        LastContactDate = friend.LastContactDate,
        LastContactType = friend.LastContactType,
        DesiredContactFrequency = friend.DesiredContactFrequency,
        CategoryName = friend.Category?.Name,
        CategoryId = friend.CategoryId
      };
    } 
}