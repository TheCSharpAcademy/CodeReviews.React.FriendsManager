﻿using System.ComponentModel.DataAnnotations.Schema;

namespace ContactsManager.API.ReactClient.Models;

public class Contact
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string? Notes { get; set; }

    public LastContactType LastContact { get; set; }
    public DateTime LastContactDate { get; set; }
    public ContactFrequency DesiredContactFrequency { get; set; }

    public int CategoryId { get; set; }

    [ForeignKey(nameof(CategoryId))]
    public Category Category { get; set; } = null!;
}

public enum LastContactType
{
    Email,
    Phone,
    TextMessage,
    VideoCall,
    FaceToFace
}

public enum ContactFrequency
{
    Daily,
    Weekly,
    Monthly,
    Quarterly,
    Yearly
} 