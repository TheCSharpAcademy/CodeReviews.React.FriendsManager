namespace FriendsManager.Api.V1.Contracts.Requests;

/// <summary>
/// Represents only the necessary information required from API requests to create a new Category.
/// </summary>
public class CreateCategoryRequest
{
    #region Properties

    public required string Name { get; set; }

    #endregion
}
