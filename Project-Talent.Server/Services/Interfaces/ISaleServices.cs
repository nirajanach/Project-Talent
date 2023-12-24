using Project_Talent.Server.ViewModels.SaleViewModel;

namespace Project_Talent.Server.Services.Interfaces
{
    public interface ISaleServices
    {
        public Task<string> CreateSale(CreateSaleViewModel model);
        public Task<List<SaleViewModel>> GetSales();
        public Task<SaleViewModel> GetSaleById(int id);
        public Task<SaleViewModel> EditSale(SaleViewModel viewModel);
        public Task<string> DeleteSale(int id);
    }
}
