using Data.Configurations;
using Data.Dummies;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data;

public class FriendsDbContext(DbContextOptions options) : DbContext(options)
{
  public DbSet<Friend> Friends { get; set; }
  public DbSet<Category> Categories { get; set; }
  
  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.ApplyConfiguration(new FriendsConfiguration());
    modelBuilder.ApplyConfiguration(new CategoryConfiguration());
    modelBuilder.Seed();
    base.OnModelCreating(modelBuilder);
  }
}

public static class ModelBuilderExtensions
{
  public static void Seed(this ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<Category>().HasData(DummyCategories.GetCategories());
  }
}
