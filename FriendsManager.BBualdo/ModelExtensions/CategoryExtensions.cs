using Contracts.DTO;
using Data.Models;

namespace ModelExtensions;

public static class CategoryExtensions
{
  public static CategoryResDto ToCategoryResponse(this Category category)
  {
    return new CategoryResDto
    {
      Id = category.Id,
      Name = category.Name
    };
  }
}