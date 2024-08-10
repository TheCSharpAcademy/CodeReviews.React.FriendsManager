using Data.Enums;

namespace Data.Models;

public class Friend
{
  public int Id { get; set; }
  public string? FirstName { get; set; }
  public string? LastName { get; set; }
  public DateOnly LastContactDate { get; set; }
  public ContactTypes LastContactType { get; set; }
  public int DesiredContactFrequency { get; set; }
  public int? CategoryId { get; set; }
  public Category? Category { get; set; }
}
