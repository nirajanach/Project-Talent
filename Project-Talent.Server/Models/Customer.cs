using System.ComponentModel.DataAnnotations.Schema;

namespace Project_Talent.Server.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }

        [InverseProperty("Customer")]
        public virtual ICollection<Sale> ProductsSold { get; set; } = new List<Sale>();

        //[InverseProperty("CustomerId")]
    }
}
