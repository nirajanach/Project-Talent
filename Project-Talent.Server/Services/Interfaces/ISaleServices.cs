using Project_Talent.Server.Models.Dto;
using Project_Talent.Server.ViewModels.SaleViewModel;

namespace Project_Talent.Server.Services.Interfaces
{
    public interface ISaleServices
    {
        public Task<string> CreateSale(SaleViewModel model);
        public Task<List<SaleDto>> GetSales();
        public Task<SaleViewModel> GetSaleById(int id);
        public Task<SaleViewModel> EditSale(SaleViewModel viewModel);
        public Task<string> DeleteSale(int id);
    }
}
