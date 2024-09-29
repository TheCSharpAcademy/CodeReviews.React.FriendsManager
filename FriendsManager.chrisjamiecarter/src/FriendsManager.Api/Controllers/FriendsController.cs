using Asp.Versioning;
using FriendsManager.Api.V1.Contracts.Requests;
using FriendsManager.Domain.Entities;
using FriendsManager.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FriendsManager.Api.Controllers;

/// <summary>
/// Provides the API with CRUD operations to interact with <see cref="Friend"/> database records.
/// </summary>
[ApiController]
[ApiVersion(1)]
[Route("api/v{v:apiVersion}/[controller]")]
public class FriendsController : ControllerBase
{
    #region Fields

    private readonly ICategoryService _categoryService;
    private readonly IFriendService _friendService;

    #endregion
    #region Constructors

    public FriendsController(ICategoryService categoryService, IFriendService friendService)
    {
        _categoryService = categoryService;
        _friendService = friendService;
    }

    #endregion
    #region Methods

    [HttpGet]
    [MapToApiVersion(1)]
    public async Task<ActionResult<IEnumerable<Category>>> Get()
    {
        return Ok(await _friendService.ReturnAsync());
    }

    [HttpGet("{id}")]
    [MapToApiVersion(1)]
    public async Task<ActionResult<Category>> Get([FromRoute] Guid id)
    {
        var category = await _friendService.ReturnAsync(id);

        return category is null ? NotFound() : Ok(category);
    }

    [HttpPost]
    [MapToApiVersion(1)]
    public async Task<ActionResult> Post([FromBody] CreateFriendRequest request)
    {
        var category = await _categoryService.ReturnAsync(request.CategoryId);
        if (category is null)
        {
            return BadRequest(new { error = $"No Category found for ID '{request.CategoryId}'." });
        }

        var friend = new Friend
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            DesiredContactFrequency = request.DesiredContactFrequency,
            LastContactDate = request.LastContactDate,
            LastContactType = request.LastContactType,
            Category = category,
        };

        await _friendService.CreateAsync(friend);
        return CreatedAtAction(nameof(Get), new { id = friend.Id }, friend);
    }

    [HttpPut("{id}")]
    [MapToApiVersion(1)]
    public async Task<ActionResult> Put([FromRoute] Guid id, [FromBody] UpdateFriendRequest request)
    {
        var friend = await _friendService.ReturnAsync(id);
        if (friend is null)
        {
            return NotFound();
        }

        var category = await _categoryService.ReturnAsync(request.CategoryId);
        if (category is null)
        {
            return BadRequest(new { error = $"No Category found for ID '{request.CategoryId}'." });
        }

        friend.Name = request.Name;
        friend.DesiredContactFrequency = request.DesiredContactFrequency;
        friend.LastContactDate = request.LastContactDate;
        friend.LastContactType = request.LastContactType;
        friend.Category = category;

        await _friendService.UpdateAsync(friend);
        return Ok(friend);
    }

    [HttpDelete("{id}")]
    [MapToApiVersion(1)]
    public async Task<ActionResult> Delete([FromRoute] Guid id)
    {
        var friend = await _friendService.ReturnAsync(id);
        if (friend is null)
        {
            return NotFound();
        }

        await _friendService.DeleteAsync(friend);
        return NoContent();
    }

    #endregion
}
