using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FriendContact.Models
{
    public class Friend
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonPropertyName("Id")]
        public int Id { get; set; }

        [JsonPropertyName("Name")]
        public string Name { get; set; }

        [JsonPropertyName("LastContactDate")]
        public DateOnly LastContactDate { get; set; }

        [JsonPropertyName("CategoryId")]
        public int CategoryId {  get; set; }
        public Category FriendCategory { get; set; }

        [JsonPropertyName("DesiredContactFrequency")]
        public int DesiredContactFrequency { get; set; }
    }
}
