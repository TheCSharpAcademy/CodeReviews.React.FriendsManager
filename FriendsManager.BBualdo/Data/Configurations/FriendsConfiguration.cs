using Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations;

public class FriendsConfiguration : IEntityTypeConfiguration<Friend>
{
  public void Configure(EntityTypeBuilder<Friend> builder)
  {
    builder.HasKey(f => f.Id);

    builder.Property(f => f.FirstName)
      .IsRequired()
      .HasMaxLength(24);

    builder.Property(f => f.LastName)
      .IsRequired()
      .HasMaxLength(48);

    builder.HasOne(f => f.Category)
      .WithMany(c => c.Friends)
      .HasForeignKey(f => f.CategoryId)
      .HasPrincipalKey(c => c.Id);
  }
}