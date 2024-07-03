using Data.Enums;

namespace Contracts.DTO;

public class FriendResDto
{
  public int Id { get; set; }
  public string? FirstName { get; set; }
  public string? LastName { get; set; }
  public DateOnly LastContactDate { get; set; }
  public ContactTypes LastContactType { get; set; }
  public int DesiredContactFrequency { get; set; }
  public string? CategoryName { get; set; }
  public int? CategoryId { get; set; }
}