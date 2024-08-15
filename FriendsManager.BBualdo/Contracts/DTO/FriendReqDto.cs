﻿using Data.Enums;
using Data.Models;

namespace Contracts.DTO;

public class FriendReqDto
{
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
      FirstName = FirstName,
      LastName = LastName,
      LastContactDate = LastContactDate,
      LastContactType = LastContactType,
      DesiredContactFrequency = DesiredContactFrequency,
      CategoryId = CategoryId
    };
  }
}