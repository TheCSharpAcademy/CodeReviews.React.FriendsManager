namespace FriendsManager.Domain.Entities;

/// <summary>
/// Represents a Friend entity within the Domain layer.
/// </summary>
public class Friend
{
    #region Properties

    public required Guid Id { get; set; }

    public required string Name { get; set; }

    public required int DesiredContactFrequency { get; set; }

    public required DateTime LastContactDate { get; set; }

    public required string LastContactType { get; set; }

    public required Category Category { get; set; }

    #endregion
}

