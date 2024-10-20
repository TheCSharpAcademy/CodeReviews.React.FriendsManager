namespace FriendsManager.Api.V1.Contracts.Requests;

/// <summary>
/// Represents only the necessary information required from API requests to update an existing Category.
/// </summary>
public class UpdateCategoryRequest
{
    #region Properties

    public required string Name { get; set; }

    #endregion
}
