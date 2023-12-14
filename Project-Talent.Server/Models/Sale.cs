using System.ComponentModel.DataAnnotations.Schema;

namespace Project_Talent.Server.Models
{
    public class Sale
    {
        public int id { get; set; }

        [ForeignKey("Customer")]
        public int CustomerId { get; set; }

        [ForeignKey("Product")]
        public int ProductId { get; set; }

        [ForeignKey("Store")]
        public int StoreId { get; set; }
        public DateTime DateSold { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }
        public virtual Store Store { get; set; }


    }
}
