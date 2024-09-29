using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FriendsManager.Infrastructure.Models;

/// <summary>
/// Represents a Friend model in the infrastructure layer.
/// </summary>
[Table("Friend")]
internal class FriendModel
{
    #region Properties

    [Key]
    public required Guid Id { get; set; }

    [Required]
    public required string Name { get; set; }

    [Required]
    public required int DesiredContactFrequency { get; set; }

    [DataType(DataType.Date), Required]
    public required DateTime LastContactDate { get; set; }

    [Required]
    public required string LastContactType { get; set; }

    [ForeignKey(nameof(Category))]
    public required Guid CategoryId { get; set; }

    public required CategoryModel Category { get; set; }

    #endregion
}
