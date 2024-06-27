using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FriendsManager.Database;
using FriendsManager.Models;

namespace FriendsManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private readonly FriendsContext _context;

        public FriendsController(FriendsContext context)
        {
            _context = context;
        }

        // GET: api/Friends
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Friend>>> GetFriends()
        {
            return await _context.Friends
                .Include(friend => friend.Category)
                .ToListAsync();
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
        public async Task<IActionResult> PutFriend(int id, FriendDTO friend)
        {
            if (id != friend.Id)
            {
                return BadRequest();
            }

            // var category = await _context.Categories.FindAsync(friend.CategoryId);

            var updatedFriend = new Friend
            {
                Id = friend.Id,
                Name = friend.Name,
                LastContactDate = friend.LastContactDate,
                LastContactType = friend.LastContactType,
                DesiredContactFrequency = friend.DesiredContactFrequency,
                CategoryId = friend.CategoryId
            };

            _context.Entry(updatedFriend).State = EntityState.Modified;

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
        public async Task<ActionResult<Friend>> PostFriend(FriendDTO friend)
        {
           // var category = await _context.Categories.FindAsync(friend.CategoryId);

            var newFriend = new Friend
            {
                Id = friend.Id,
                Name = friend.Name,
                LastContactDate = friend.LastContactDate,
                LastContactType = friend.LastContactType,
                DesiredContactFrequency = friend.DesiredContactFrequency,
                CategoryId = friend.CategoryId
            };
            
            _context.Friends.Add(newFriend);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFriend", new { id = friend.Id }, friend);
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
