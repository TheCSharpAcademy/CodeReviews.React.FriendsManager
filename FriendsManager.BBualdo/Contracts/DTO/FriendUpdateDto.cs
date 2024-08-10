using Data.Enums;
using Data.Models;

namespace Contracts.DTO;

public class FriendUpdateDto
{
  public int Id { get; set; }
  public string? FirstName { get; set; }
  public string? LastName { get; set; }
  public DateOnly LastContactDate { get; set; }
  public ContactTypes LastContactType { get; set; }
  public int DesiredContactFrequency { get; set; }
  public int? CategoryId { get; set; }

  public Friend ToFriend()
  {
    return new Friend
    {
      Id = Id,
      FirstName = FirstName,
      LastName = LastName,
      LastContactDate = LastContactDate,
      LastContactType = LastContactType,
      DesiredContactFrequency = DesiredContactFrequency,
      CategoryId = CategoryId
    };
  }
}