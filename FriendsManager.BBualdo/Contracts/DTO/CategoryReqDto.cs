using Data.Models;

namespace Contracts.DTO;

public class CategoryReqDto
{
  public string? Name { get; set; }

  public Category ToCategory()
  {
    return new Category
    {
      Name = Name
    };
  }
}