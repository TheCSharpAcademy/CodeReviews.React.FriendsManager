using Contracts.DTO;
using Data.Models;

namespace Contracts;

public interface ICategoriesService
{
  Task<IEnumerable<CategoryResDto>> GetCategoriesAsync();
}