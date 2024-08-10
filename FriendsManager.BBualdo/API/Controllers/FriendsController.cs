using Contracts;
using Contracts.DTO;
using Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/friends")]
[ApiController]
public class FriendsController(IFriendsService friendsService) : ControllerBase
{
  private readonly IFriendsService _friendsService = friendsService;

  [HttpGet]
  public async Task<ActionResult<IEnumerable<FriendResDto>>> GetFriends()
  {
    var friends = await _friendsService.GetFriendsAsync();
    return Ok(friends);
  }

  [HttpPost]
  public async Task<ActionResult> AddFriend(FriendReqDto friend)
  {
    await _friendsService.AddFriendAsync(friend);
    return CreatedAtAction(nameof(AddFriend), friend);
  }

  [HttpPut]
  public async Task<ActionResult> UpdateFriend(FriendUpdateDto friend)
  {
    await _friendsService.UpdateFriendAsync(friend);
    return NoContent();
  }

  [HttpDelete("{id:int}")]
  public async Task<ActionResult> DeleteFriend(int id)
  {
    var friend = await _friendsService.GetFriendByIdAsync(id);
    if (friend is null) return NotFound();
    await _friendsService.DeleteFriendAsync(friend);
    return NoContent();
  }
}