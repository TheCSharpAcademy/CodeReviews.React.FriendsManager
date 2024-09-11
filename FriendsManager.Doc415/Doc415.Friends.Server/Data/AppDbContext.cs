using Doc415.Friends.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Doc415.Friends.Server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Friend> Friends { get; set; }
    public DbSet<FCategory> FCategories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Required seed data.
        modelBuilder.Entity<FCategory>().HasData(
            new FCategory
            {
                Id = Guid.NewGuid(),
                Name = "School"
            },
            new FCategory
            {
                Id = Guid.NewGuid(),
                Name = "Work"
            },
            new FCategory
            {
                Id = Guid.NewGuid(),
                Name = "Social"
            }
        );

        base.OnModelCreating(modelBuilder);
    }
}
