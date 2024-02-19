using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace FriendContact.Models
{
    public class FriendListContext : DbContext
    {
        public FriendListContext( DbContextOptions<FriendListContext> options ) : base(options) { }

        protected override void OnModelCreating( ModelBuilder modelBuilder )
        {
            modelBuilder.Entity<Friend>()
                .HasOne(e => e.FriendCategory)
                .WithMany(e => e.Friends)
                .HasForeignKey(e => e.CategoryId)
                .IsRequired();

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Category>().HasData(
                    new Category { Id = 1, Name = "Friend" },
                    new Category { Id = 2, Name = "Best-Friend" }
                );

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Friend>().HasData(
                    new Friend { Id = 1, Name = "John", CategoryId = 1, DesiredContactFrequency = 3, LastContactDate = DateOnly.FromDateTime(DateTime.Now) }
                );

            modelBuilder.Entity<Friend>()
            .Property(x => x.Id)
            .ValueGeneratedOnAdd();
        }

        public DbSet<Friend> Friends { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}
