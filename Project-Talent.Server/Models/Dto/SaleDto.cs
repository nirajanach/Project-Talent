namespace Project_Talent.Server.Models.Dto
{
    public class SaleDto
    {
        public int Id { get; set; }
        public string? ProductName { get; set; }

        public string? CustomerName { get; set; }

        public string? StoreName { get; set; }
        public DateTime? DateSold { get; set; }
    }
}
