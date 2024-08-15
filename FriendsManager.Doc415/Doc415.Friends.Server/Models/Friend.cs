using System.ComponentModel.DataAnnotations;


namespace Doc415.Friends.Server.Models;

public class Friend
{
    [Key]
    public Guid Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    [DataType(DataType.Date)]
    public DateOnly LastContact { get; set; }
    [Required]
    public int MinRecontactInDays { get; set; }
    [Required]
    public FCategory InCategory { get; set; }
    [Required]
    public string LastContactMethod { get; set; }

}
