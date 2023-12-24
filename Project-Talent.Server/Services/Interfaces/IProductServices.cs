using Project_Talent.Server.ViewModels.ProductViewModel;

namespace Project_Talent.Server.Services.Interfaces
{
    public interface IProductServices
    {
        public Task<int> CreateProduct(CreateProductViewModel model);
        public Task<List<ProductViewModel>> GetProducts();
        public Task<ProductViewModel> GetProductById(int id);
        public Task<ProductViewModel> EditProduct(ProductViewModel viewModel);
        public Task<bool> DeleteProduct(int id);
    }
}
