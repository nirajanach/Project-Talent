using Project_Talent.Server.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_Talent.Server.ViewModels.ProductViewModel
{
    public class ProductViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}
