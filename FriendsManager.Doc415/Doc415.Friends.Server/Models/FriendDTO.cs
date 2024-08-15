namespace Doc415.Friends.Server.Models
{
    public class FriendDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string FormattedDate { get; set; }
        public int MinRecontactInDays { get; set; }
        public string InCategory { get; set; }
        public string CategoryName { get; set; }
        public string LastContactMethod { get; set; }
        public bool IsMissedContact { get; set; } = false;
        public int DaysToNextContact { get; set; }
    }
}
