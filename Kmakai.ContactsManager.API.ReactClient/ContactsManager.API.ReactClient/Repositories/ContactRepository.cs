using ContactsManager.API.ReactClient.Data;
using ContactsManager.API.ReactClient.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsManager.API.ReactClient.Repositories;

public class ContactRepository : IContactRespository
{
    private readonly AppDBContext _context;

    public ContactRepository(AppDBContext context)
    {
        _context = context;
    }

    public Task<List<Category>> categories => _context.Categories.ToListAsync();

    public void AddContactAsync(Contact contact)
    {
        if (contact == null)
        {
            throw new ArgumentNullException(nameof(contact));
        }

        try
        {
            contact.Category = _context.Categories.FirstOrDefault(c => c.Id == contact.CategoryId)!;
            _context.Contacts.Add(contact);
            _context.SaveChanges();
        }
        catch (Exception ex)
        {
            throw new Exception($"Couldn't add contact: {ex.Message}");
        }

    }

    public Task<Contact> DeleteContactAsync(int id)
    {
        if (id == 0)
        {
            throw new ArgumentNullException(nameof(id));
        }

        try
        {
            var contact = _context.Contacts.FirstOrDefault(c => c.Id == id);
            if (contact == null)
            {
                throw new Exception($"Couldn't find contact with id: {id}");
            }

            _context.Contacts.Remove(contact);
            _context.SaveChanges();
            return Task.FromResult(contact);
        }
        catch (Exception ex)
        {
            throw new Exception($"Couldn't delete contact: {ex.Message}");
        }
    }

    public Task<Contact> GetContactAsync(int id)
    {
        if (id == 0)
        {
            throw new ArgumentNullException(nameof(id));
        }

        try
        {
            var result = _context.Contacts.Include(c => c.Category).FirstOrDefault(c => c.Id == id);
            if (result == null)
            {
                throw new Exception($"Couldn't find contact with id: {id}");
            }

            return Task.FromResult(result);
        }
        catch (Exception ex)
        {
            throw new Exception($"Couldn't retrieve contact: {ex.Message}");
        }

    }

    public Task<IEnumerable<Contact>> GetContactsAsync()
    {
        var contacts = _context.Contacts.Include(c => c.Category).ToList();

        return Task.FromResult(contacts.AsEnumerable());
    }

    public Task<Contact> UpdateContactAsync(Contact contact)
    {
        try
        {
            var existingContact = _context.Contacts.FirstOrDefault(c => c.Id == contact.Id);
            if (existingContact == null)
            {
                throw new Exception($"Couldn't find contact with id: {contact.Id}");
            }

            existingContact.Name = contact.Name;
            existingContact.Email = contact.Email;
            existingContact.Phone = contact.Phone;
            existingContact.Notes = contact.Notes;
            existingContact.LastContact = contact.LastContact;
            existingContact.LastContactDate = contact.LastContactDate;
            existingContact.DesiredContactFrequency = contact.DesiredContactFrequency;
            existingContact.CategoryId = contact.CategoryId;

            _context.SaveChanges();
            return Task.FromResult(existingContact);
        }
        catch (Exception ex)
        {
            throw new Exception($"Couldn't update contact: {ex.Message}");
        }
    }

}

