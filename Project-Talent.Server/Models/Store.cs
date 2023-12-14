using System.ComponentModel.DataAnnotations.Schema;

namespace Project_Talent.Server.Models
{
    public class Store
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }

        [InverseProperty("Store")]
        public ICollection<Sale> ProductSold { get; set; }

    }
}
