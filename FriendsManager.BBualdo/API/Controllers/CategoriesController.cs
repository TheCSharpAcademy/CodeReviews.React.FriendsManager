using Contracts;
using Contracts.DTO;
using Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/categories")]
[ApiController]
public class CategoriesController(ICategoriesService categoriesService) : ControllerBase
{
  private readonly ICategoriesService _categoriesService = categoriesService;
  
  [HttpGet]
  public async Task<ActionResult<IEnumerable<CategoryResDto>>> GetCategories()
  {
    var categories = await _categoriesService.GetCategoriesAsync();
    return Ok(categories);
  }
}