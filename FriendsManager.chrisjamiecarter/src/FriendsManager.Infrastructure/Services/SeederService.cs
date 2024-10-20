using Bogus;
using FriendsManager.Infrastructure.Contexts;
using FriendsManager.Infrastructure.Models;

namespace FriendsManager.Infrastructure.Services;

/// <summary>
/// Provides methods to seed the database with initial data.
/// This service adds a defined set of default Categories and a set of fake Friends using Bogus.
/// </summary>
internal class SeederService : ISeederService
{
    #region Fields

    private readonly string[] _categories =
    [
        "Acquaintance",
        "Best Friends",
        "Childhood Friends",
        "Close Friends",
        "Colleagues",
        "Family",
        "Friends of a Friend",
        "Neighbours",
        "Online Friends",
        "School Friends"
    ];

    private readonly string[] _contactTypes =
    [
        "Email",
        "In-person",
        "Phone Call",
        "Text",
        "Voice Call",
        "Video Call",
    ];

    private readonly FriendsManagerDataContext _context;

    #endregion
    #region Constructors

    public SeederService(FriendsManagerDataContext context)
    {
        _context = context;
    }

    #endregion
    #region Methods

    public void SeedDatabase()
    {
        // Categories first.
        SeedCategories();

        // Friends require Categories.
        SeedFriends();
    }

    private void SeedCategories()
    {
        if (_context.Category.Any())
        {
            return;
        }

        foreach (var category in _categories)
        {
            _context.Category.Add(new CategoryModel
            {
                Id = Guid.NewGuid(),
                Name = category,
            });

        }
        _context.SaveChanges();
    }

    private void SeedFriends()
    {
        Randomizer.Seed = new Random(19890309);

        if (_context.Friend.Any())
        {
            return;
        }

        var categories = _context.Category.ToList();

        var fakeData = new Faker<FriendModel>()
            .RuleFor(m => m.Id, f => f.Random.Guid())
            .RuleFor(m => m.Name, f => f.Name.FullName())
            .RuleFor(m => m.DesiredContactFrequency, f => f.Random.Int(1, 365))
            .RuleFor(m => m.LastContactDate, f => f.Date.Past(1))
            .RuleFor(m => m.LastContactType, f => f.PickRandom(_contactTypes))
            .RuleFor(m => m.Category, f => f.PickRandom(categories))
            .RuleFor(m => m.CategoryId, (f, m) => m.Category.Id);

        foreach (var fake in fakeData.Generate(20))
        {
            _context.Friend.Add(fake);
        }

        _context.SaveChanges();
    }

    #endregion
}
