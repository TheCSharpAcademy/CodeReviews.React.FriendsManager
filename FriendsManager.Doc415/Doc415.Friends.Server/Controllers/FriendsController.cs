using Doc415.Friends.Server.Data;
using Doc415.Friends.Server.Models;
using Doc415.Friends.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Doc415.Friends.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private FriendService _friendService;
        public FriendsController(AppDbContext context, FriendService friendService)
        {
            _friendService = friendService;
            _context = context;
        }

        // GET: api/Friends
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FriendDTO>>> GetFriends()
        {
            return await _friendService.GetFriends();
        }

        // GET: api/Friends/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Friend>> GetFriend(Guid id)
        {
            var friend = await _context.Friends.FindAsync(id);

            if (friend is null)
            {
                return NotFound();
            }

            return friend;
        }

        // PUT: api/Friends/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFriend(string id, FriendDTO friend)
        {
            if (id != friend.Id)
            {
                return BadRequest();
            }

            try
            {
                var result = await _friendService.UpdateFriend(friend);
                return CreatedAtAction("PutFriend", new { id = result.Id }, result);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FriendExists(Guid.Parse(id)))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }

            }

        }

        // POST: api/Friends
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FriendDTO>> PostFriend(FriendDTO friend)
        {
            var newFriend = await _friendService.AddFriend(friend);
            if (newFriend is not null)
            {
                return CreatedAtAction("GetFriend", new { id = newFriend.Id }, newFriend);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE: api/Friends/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFriend(string id)
        {
            var guidId = Guid.Parse(id);
            Friend friend = await _context.Friends.FindAsync(guidId);
            if (friend == null)
            {
                return NotFound();
            }

            _context.Friends.Remove(friend);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FriendExists(Guid id)
        {
            return _context.Friends.Any(e => e.Id == id);
        }
    }
}
