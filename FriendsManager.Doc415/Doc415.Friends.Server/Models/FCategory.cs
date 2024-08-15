using System.ComponentModel.DataAnnotations;


namespace Doc415.Friends.Server.Models;

public class FCategory
{
    [Key]
    public Guid Id { get; set; }
    [Required]
    public string Name { get; set; }
    public ICollection<Friend> Friends { get; set; } = [];

}
