using System.ComponentModel.DataAnnotations.Schema;

namespace Project_Talent.Server.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal? Price { get; set; }

        [InverseProperty("Product")]
        public virtual ICollection<Sale> ProductSold { get; set; } = new List<Sale>();
    }
}
