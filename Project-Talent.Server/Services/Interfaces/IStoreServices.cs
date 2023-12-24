using Project_Talent.Server.ViewModels.StoreViewModel;

namespace Project_Talent.Server.Services.Interfaces
{
    public interface IStoreServices
    {
        public Task<int> CreateStore(CreateStoreViewModel model);
        public Task<List<StoreViewModel>> GetStores();
        public Task<StoreViewModel> GetStoreById(int id);
        public Task<StoreViewModel> EditStore(StoreViewModel viewModel);
        public Task<bool> DeleteStore(int id);
    }
}
