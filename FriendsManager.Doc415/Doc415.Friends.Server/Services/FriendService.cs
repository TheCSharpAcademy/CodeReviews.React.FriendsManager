using Doc415.Friends.Server.Data;
using Doc415.Friends.Server.Models;
using Microsoft.EntityFrameworkCore;
namespace Doc415.Friends.Server.Services;

public class FriendService
{
    private AppDbContext _context;

    public FriendService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<FriendDTO> UpdateFriend(FriendDTO friend)
    {
        var categories = await _context.FCategories.ToListAsync();

        var dbFriend = await _context.Friends.FindAsync(Guid.Parse(friend.Id));
        dbFriend.Name = friend.Name;
        dbFriend.LastContact = DateOnly.Parse(friend.FormattedDate);
        dbFriend.MinRecontactInDays = friend.MinRecontactInDays;
        dbFriend.InCategory = categories.Single(c => c.Id == Guid.Parse(friend.InCategory));
        dbFriend.LastContactMethod = friend.LastContactMethod;

        _context.Update(dbFriend);
        await _context.SaveChangesAsync();

        friend.IsMissedContact = (DateTime.Parse(dbFriend.LastContact.ToString()) + TimeSpan.FromDays(dbFriend.MinRecontactInDays)) < DateTime.Now+TimeSpan.FromDays(1);
        friend.DaysToNextContact = (DateTime.Parse(dbFriend.LastContact.ToString()) + TimeSpan.FromDays(dbFriend.MinRecontactInDays) - DateTime.Now).Days;
        friend.CategoryName= dbFriend.InCategory.Name;
        return friend;
    }

    public async Task<FriendDTO> AddFriend(FriendDTO friend)
    {
        try
        {
            var category = await _context.FCategories.FindAsync(Guid.Parse(friend.InCategory))!;
            var newFriend = new Friend()
            {
                Id = Guid.NewGuid(),
                Name = friend.Name,
                LastContact = DateOnly.Parse(friend.FormattedDate),
                MinRecontactInDays = friend.MinRecontactInDays,
                InCategory = category,
                LastContactMethod = friend.LastContactMethod
            };
            await _context.Friends.AddAsync(newFriend);
            await _context.SaveChangesAsync();

            var newFriendDto = new FriendDTO()
            {
                Id = newFriend.Id.ToString(),
                Name = newFriend.Name,
                FormattedDate = newFriend.LastContact.ToString(),
                MinRecontactInDays = newFriend.MinRecontactInDays,
                InCategory = newFriend.InCategory.Id.ToString(),
                CategoryName= newFriend.InCategory.Name,
                LastContactMethod = newFriend.LastContactMethod,
                IsMissedContact = (DateTime.Parse(newFriend.LastContact.ToString()) + TimeSpan.FromDays(newFriend.MinRecontactInDays)) < DateTime.Now+TimeSpan.FromDays(1),
                DaysToNextContact = (newFriend.LastContact.ToDateTime(TimeOnly.MinValue) + TimeSpan.FromDays(newFriend.MinRecontactInDays) - DateTime.Now).Days
            };
            return newFriendDto;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return null;
        }
    }

    public async Task<List<FriendDTO>> GetFriends()
    {
        try
        {
            var friends = await _context.Friends.Include(f => f.InCategory).ToListAsync();
            var friendsDTOList = new List<FriendDTO>();
            foreach (var friend in friends)
            {
                var newFriendDto = new FriendDTO()
                {
                    Id = friend.Id.ToString(),
                    Name = friend.Name,
                    FormattedDate = friend.LastContact.ToString(),
                    MinRecontactInDays = friend.MinRecontactInDays,
                    InCategory = friend.InCategory.Id.ToString(),
                    LastContactMethod = friend.LastContactMethod,
                    CategoryName = friend.InCategory.Name,
                    IsMissedContact = friend.LastContact.AddDays(friend.MinRecontactInDays) < DateOnly.FromDateTime(DateTime.Now),
                    DaysToNextContact = (friend.LastContact.ToDateTime(TimeOnly.MinValue) + TimeSpan.FromDays(friend.MinRecontactInDays) - DateTime.Now).Days
                };
                friendsDTOList.Add(newFriendDto);
            }
            return friendsDTOList;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return [];
        }
    }
}
