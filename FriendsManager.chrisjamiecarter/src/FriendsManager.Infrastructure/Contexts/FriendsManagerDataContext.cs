using FriendsManager.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace FriendsManager.Infrastructure.Contexts;

/// <summary>
/// Represents the Entity Framework Core database context for the FriendsManager data store.
/// </summary>
internal class FriendsManagerDataContext : DbContext
{
    #region Constructors

    public FriendsManagerDataContext(DbContextOptions<FriendsManagerDataContext> options) : base(options) { }

    #endregion
    #region Properties

    public DbSet<CategoryModel> Category { get; set; } = default!;

    public DbSet<FriendModel> Friend { get; set; } = default!;

    #endregion
}
