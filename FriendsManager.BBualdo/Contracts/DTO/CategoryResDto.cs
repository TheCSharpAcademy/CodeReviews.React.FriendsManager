using Data.Models;

namespace Contracts.DTO;

public class CategoryResDto
{
  public int Id { get; set; }
  public string? Name { get; set; }

  public Category ToCategory()
  {
    return new Category
    {
      Id = Id,
      Name = Name
    };
  }
}