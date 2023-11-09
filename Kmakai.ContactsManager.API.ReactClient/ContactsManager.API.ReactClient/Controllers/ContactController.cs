using ContactsManager.API.ReactClient.Models;
using ContactsManager.API.ReactClient.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ContactsManager.API.ReactClient.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ContactController : ControllerBase
{
    private readonly IContactRespository _contactRepository;

    public ContactController(IContactRespository contactRepository)
    {
        _contactRepository = contactRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
    {
        try
        {
            var result = await _contactRepository.GetContactsAsync();   
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving contacts: {ex.Message}");
        }
    }

    [HttpGet("categories")]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
    {
        try
        {
            var result = await _contactRepository.categories;
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving categories: {ex.Message}");
        }
    }


    [HttpPost]
    public ActionResult AddContact([FromBody] ContactDTO contact)
    {
        if (contact == null)
        {
            return BadRequest();
        }

        try
        {
            var newContact = new Contact
            {
                Name = contact.Name,
                Email = contact.Email,
                Phone = contact.Phone,
                Notes = contact.Notes,
                LastContact = contact.LastContact,
                LastContactDate = contact.LastContactDate,
                DesiredContactFrequency = contact.DesiredContactFrequency,
                CategoryId = contact.CategoryId
            };
           
            _contactRepository.AddContactAsync(newContact);
            return CreatedAtAction(nameof(GetContact), new { id = contact.Id }, contact);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Error adding contact: {ex.Message}");
        }
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Contact>> GetContact(int id)
    {
        try
        {
            var result = await _contactRepository.GetContactAsync(id);
            if (result == null)
            {
                return NotFound();
            }

            return result;
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving contact: {ex.Message}");
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<Contact>> DeleteContact(int id)
    {
        try
        {
            var contactToDelete = await _contactRepository.GetContactAsync(id);
            if (contactToDelete == null)
            {
                return NotFound($"Contact with id: {id} not found");
            }

            return await _contactRepository.DeleteContactAsync(id);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Error deleting contact: {ex.Message}");
        }
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Contact>> UpdateContact(int id, [FromBody] ContactDTO contact)
    {
        try
        {
            if (id != contact.Id)
            {
                return BadRequest($"Contact id: {id} does not match contact id: {contact.Id}");
            }

            var contactToUpdate = await _contactRepository.GetContactAsync(id);
            if (contactToUpdate == null)
            {
                return NotFound($"Contact with id: {id} not found");
            }

            contactToUpdate.Name = contact.Name;
            contactToUpdate.Email = contact.Email;
            contactToUpdate.Phone = contact.Phone;
            contactToUpdate.Notes = contact.Notes;
            contactToUpdate.LastContact = contact.LastContact;
            contactToUpdate.LastContactDate = contact.LastContactDate;
            contactToUpdate.DesiredContactFrequency = contact.DesiredContactFrequency;
            contactToUpdate.CategoryId = contact.CategoryId;

            return await _contactRepository.UpdateContactAsync(contactToUpdate);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Error updating contact: {ex.Message}");
        }
    }
    
}
