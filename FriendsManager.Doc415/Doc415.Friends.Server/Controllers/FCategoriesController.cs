using Doc415.Friends.Server.Data;
using Doc415.Friends.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Doc415.Friends.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FCategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FCategoriesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/FCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FCategoryDTO>>> GetFCategories()
        {
            var categories = await _context.FCategories.ToListAsync();
            var categoryDTOList = new List<FCategoryDTO>();
            foreach (var category in categories)
            {
                var tempDTO = new FCategoryDTO();
                tempDTO.Name = category.Name;
                tempDTO.Id = category.Id.ToString();
                categoryDTOList.Add(tempDTO);
            }
            return categoryDTOList;
        }

        // GET: api/FCategories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FCategory>> GetFCategory(Guid id)
        {
            var fCategory = await _context.FCategories.FindAsync(id);

            if (fCategory == null)
            {
                return NotFound();
            }

            return fCategory;
        }

        // PUT: api/FCategories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFCategory(Guid id, FCategory fCategory)
        {
            if (id != fCategory.Id)
            {
                return BadRequest();
            }

            _context.Entry(fCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FCategoryExists(id))
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

        // POST: api/FCategories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FCategoryDTO>> PostFCategory(FCategoryDTO fCategory)
        {
            var newId = Guid.NewGuid();
            var newCategory = new FCategory()
            {
                Id = newId,
                Name = fCategory.Name
            };
            fCategory.Id = newId.ToString();
            _context.FCategories.Add(newCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFCategory", new { id = fCategory.Id }, fCategory);
        }

        // DELETE: api/FCategories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFCategory(Guid id)
        {

            try
            {
                var fCategory = await _context.FCategories.FindAsync(id);
                if (fCategory == null)
                {
                    return NotFound();
                }
                _context.FCategories.Remove(fCategory);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }


        }

        private bool FCategoryExists(Guid id)
        {
            return _context.FCategories.Any(e => e.Id == id);
        }
    }
}
