using Asp.Versioning;
using FriendsManager.Api.V1.Contracts.Requests;
using FriendsManager.Domain.Entities;
using FriendsManager.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FriendsManager.Api.Controllers;

/// <summary>
/// Provides the API with CRUD operations to interact with <see cref="Category"/> database records.
/// </summary>
[ApiController]
[ApiVersion(1)]
[Route("api/v{v:apiVersion}/[controller]")]
public class CategoriesController : ControllerBase
{
    #region Fields

    private readonly ICategoryService _service;

    #endregion
    #region Constructors

    public CategoriesController(ICategoryService service)
    {
        _service = service;
    }

    #endregion
    #region Methods

    [HttpGet]
    [MapToApiVersion(1)]
    public async Task<ActionResult<IEnumerable<Category>>> Get()
    {
        return Ok(await _service.ReturnAsync());
    }

    [HttpGet("{id}")]
    [MapToApiVersion(1)]
    public async Task<ActionResult<Category>> Get([FromRoute] Guid id)
    {
        var category = await _service.ReturnAsync(id);
        return category is null ? NotFound() : Ok(category);
    }

    [HttpPost]
    [MapToApiVersion(1)]
    public async Task<ActionResult> Post([FromBody] CreateCategoryRequest request)
    {
        var category = new Category
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
        };

        await _service.CreateAsync(category);
        return CreatedAtAction(nameof(Get), new { id = category.Id }, category);
    }

    [HttpPut("{id}")]
    [MapToApiVersion(1)]
    public async Task<ActionResult> Put([FromRoute] Guid id, [FromBody] UpdateCategoryRequest request)
    {
        var category = await _service.ReturnAsync(id);
        if (category is null)
        {
            return NotFound();
        }

        category.Name = request.Name;

        await _service.UpdateAsync(category);
        return Ok(category);
    }

    [HttpDelete("{id}")]
    [MapToApiVersion(1)]
    public async Task<ActionResult> Delete([FromRoute] Guid id)
    {
        var category = await _service.ReturnAsync(id);
        if (category is null)
        {
            return NotFound();
        }

        await _service.DeleteAsync(category);
        return NoContent();
    }

    #endregion
}
