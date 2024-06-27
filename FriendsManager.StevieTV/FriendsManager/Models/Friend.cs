namespace FriendsManager.Models;

public class Friend
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateOnly LastContactDate { get; set; }
    public string LastContactType { get; set; }
    public int DesiredContactFrequency { get; set; }

    public int CategoryId { get; set; }
    public Category Category { get; set; }
}

public class FriendDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateOnly LastContactDate { get; set; }
    public string LastContactType { get; set; }
    public int DesiredContactFrequency { get; set; }

    public int CategoryId { get; set; }
}