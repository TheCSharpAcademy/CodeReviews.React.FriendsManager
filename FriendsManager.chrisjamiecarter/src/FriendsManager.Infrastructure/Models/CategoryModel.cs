using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FriendsManager.Infrastructure.Models;

/// <summary>
/// Represents a Category model in the infrastructure layer.
/// </summary>
[Table("Category")]
internal class CategoryModel
{
    #region Properties

    [Key]
    public required Guid Id { get; set; }

    [Required]
    public required string Name { get; set; }

    public List<FriendModel>? Friends { get; set; }

    #endregion
}
