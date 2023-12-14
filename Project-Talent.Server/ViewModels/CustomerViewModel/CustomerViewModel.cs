using Project_Talent.Server.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_Talent.Server.ViewModels.CustomerViewModel
{
    public class CustomerViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
    }
}
