using ContactsManager.API.ReactClient.Models;

namespace ContactsManager.API.ReactClient.Repositories;

public interface IContactRespository
{
    Task<IEnumerable<Contact>> GetContactsAsync();
    Task<List<Category>> categories { get; }
    Task<Contact> GetContactAsync(int id);
    void AddContactAsync(Contact contact);
    Task<Contact> UpdateContactAsync(Contact contact);
    Task<Contact> DeleteContactAsync(int id);
}
