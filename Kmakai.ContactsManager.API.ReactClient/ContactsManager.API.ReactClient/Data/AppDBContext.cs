using ContactsManager.API.ReactClient.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsManager.API.ReactClient.Data;

public class AppDBContext: DbContext
{
    public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
    {
    }

    public DbSet<Contact> Contacts { get; set; } = null!;
    public DbSet<Category> Categories { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Contact>()
            .HasOne(c => c.Category);
    }
}

