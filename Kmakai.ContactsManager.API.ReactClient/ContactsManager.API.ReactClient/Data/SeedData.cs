using ContactsManager.API.ReactClient.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsManager.API.ReactClient.Data;

public class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using var context = new AppDBContext(serviceProvider.GetRequiredService<DbContextOptions<AppDBContext>>());

        if(context.Contacts.Any() || context.Categories.Any()) return;
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        AddCategories(context);
        AddContacts(context);
    }

    private static void AddCategories(AppDBContext context)
    {
        context.Categories.AddRange(
            new Category
            {
                Name = "Family"
            },
            new Category
            {
                Name = "Friends"
            },
            new Category
            {
                Name = "Work"
            },
            new Category
            {
                Name = "Other"
            });

        context.SaveChanges();
    }

    private static void AddContacts(AppDBContext context)
    {
        context.Contacts.AddRange(
             new Contact
             {
                 Name = "John Doe",
                 Email = "John@gmail.com",
                 Phone = "1234567890",
                 Notes = "This is a test contact",
                 LastContact = LastContactType.VideoCall,
                 LastContactDate = DateTime.Now,
                 DesiredContactFrequency = ContactFrequency.Daily,
                 CategoryId = 1
             },
             new Contact
             {
                 Name = "Jane Doe",
                 Email = "Jane@gmail.com",
                 Phone = "1234567890",
                 Notes = "This is a test contact",
                 LastContact = LastContactType.TextMessage,
                 LastContactDate = DateTime.Now,
                 DesiredContactFrequency = ContactFrequency.Daily,
                 CategoryId = 1
             },
             new Contact
             {
                 Name = "Tom Cat",
                 Email = "Tom@gmail.com",
                 Phone = "1234567890",
                 Notes = "This is a test contact",
                 LastContact = LastContactType.Phone,
                 LastContactDate = DateTime.Now,
                 DesiredContactFrequency = ContactFrequency.Daily,
                 CategoryId = 2
             },
             new Contact
             {
                 Name = "Jerry Mouse",
                 Email = "Jerry@gmail.com",
                 Phone = "1234567890",
                 Notes = "This is a test contact",
                 LastContact = LastContactType.FaceToFace,
                 LastContactDate = DateTime.Now,
                 DesiredContactFrequency = ContactFrequency.Daily,
                 CategoryId = 2
             },
              new Contact
              {
                  Name = "Patrick Star",
                  Email = "Patrick@gmail.com",
                  Phone = "1234567890",
                  Notes = "This is a test contact",
                  LastContact = LastContactType.Email,
                  LastContactDate = DateTime.Now,
                  DesiredContactFrequency = ContactFrequency.Daily,
                  CategoryId = 3
              },
               new Contact
               {
                   Name = "Sandy Cheeks",
                   Email = "Sandy@gmail.com",
                   Phone = "1234567890",
                   Notes = "This is a test contact",
                   LastContact = LastContactType.Email,
                   LastContactDate = DateTime.Now,
                   DesiredContactFrequency = ContactFrequency.Daily,
                   CategoryId = 4
               });

        context.SaveChanges();
    }
}
