using Project_Talent.Server.Models;

namespace Project_Talent.Server.ViewModels.SaleViewModel
{
    public class CreateSaleViewModel
    {
        public DateTime DateSold { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }
        public virtual Store Store { get; set; }

    }
}
