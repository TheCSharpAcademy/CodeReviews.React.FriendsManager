using FriendsManager.Models;
using Microsoft.EntityFrameworkCore;

namespace FriendsManager.Database;

public class FriendsContext(DbContextOptions<FriendsContext> options) : DbContext(options)
{
    public DbSet<Category> Categories { get; set; }
    public DbSet<Friend> Friends { get; set; }
}