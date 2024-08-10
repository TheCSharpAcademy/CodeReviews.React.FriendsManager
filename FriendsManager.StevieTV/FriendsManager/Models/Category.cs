namespace FriendsManager.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }

    public ICollection<Friend> Friends { get; } = new List<Friend>();
}