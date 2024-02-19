using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FriendContact.Models;

namespace FriendContact.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private readonly FriendListContext _context;

        public FriendsController(FriendListContext context)
        {
            _context = context;
        }

        // GET: api/Friends
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Friend>>> GetFriends()
        {
            return await _context.Friends.ToListAsync();
        }

        // GET: api/Friends/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Friend>> GetFriend(int id)
        {
            var friend = await _context.Friends.FindAsync(id);

            if (friend == null)
            {
                return NotFound();
            }

            return friend;
        }

        // PUT: api/Friends/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFriend(int id, FriendsDTO friend )
        {
            if (id != friend.Id)
            {
                return BadRequest();
            }

            var category = _context.Categories.Find(friend.CategoryId);

            var frien = new Friend
            {
                Id = friend.Id,
                Name = friend.Name,
                CategoryId = friend.CategoryId,
                DesiredContactFrequency = friend.DesiredContactFrequency,
                LastContactDate = friend.LastContactDate,
                FriendCategory = category
            };

            _context.Entry(frien).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FriendExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Friends
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Friend>> PostFriend([FromBody] FriendsDTO friend)
        {
            var category = _context.Categories.Find(friend.CategoryId);

            var frien = new Friend { Id = friend.Id, Name = friend.Name, CategoryId = friend.CategoryId, 
                DesiredContactFrequency = friend.DesiredContactFrequency, LastContactDate = friend.LastContactDate, FriendCategory = category
            };

            _context.Friends.Add(frien);
            await _context.SaveChangesAsync();

            friend.Id = frien.Id;

            // Make sure we send the DTO back

            return CreatedAtAction("GetFriend", new { id = frien.Id }, friend);
        }

        // DELETE: api/Friends/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFriend(int id)
        {
            var friend = await _context.Friends.FindAsync(id);
            if (friend == null)
            {
                return NotFound();
            }

            _context.Friends.Remove(friend);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FriendExists(int id)
        {
            return _context.Friends.Any(e => e.Id == id);
        }
    }
}
