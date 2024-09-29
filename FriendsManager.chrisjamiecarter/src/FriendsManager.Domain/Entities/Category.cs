namespace FriendsManager.Domain.Entities;

/// <summary>
/// Represents a Category entity within the Domain layer.
/// </summary>
public class Category
{
    #region Properties

    public required Guid Id { get; set; }

    public required string Name { get; set; }

    #endregion
}
