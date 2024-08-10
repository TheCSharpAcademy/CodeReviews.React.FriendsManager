using Contracts;
using Contracts.DTO;
using Data.Models;
using ModelExtensions;
using Repository;

namespace Services;

public class CategoriesService(IRepository<Category> categoriesRepository) : ICategoriesService
{
  private readonly IRepository<Category> _categoriesRepository = categoriesRepository;
  
  public async Task<IEnumerable<CategoryResDto>> GetCategoriesAsync()
  {
    var categories = await _categoriesRepository.GetAsync();

    return categories.Select(category => category.ToCategoryResponse()).ToList();
  }
}