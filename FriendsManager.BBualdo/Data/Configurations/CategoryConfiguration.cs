using Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
  public void Configure(EntityTypeBuilder<Category> builder)
  {
    builder.HasKey(c => c.Id);

    builder.Property(c => c.Name)
      .IsRequired()
      .HasMaxLength(24);

    builder.HasMany(c => c.Friends)
      .WithOne(f => f.Category)
      .HasForeignKey(f => f.CategoryId)
      .HasPrincipalKey(c => c.Id);
  }
}