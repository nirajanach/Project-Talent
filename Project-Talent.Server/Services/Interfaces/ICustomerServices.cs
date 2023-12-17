using Project_Talent.Server.ViewModels.CustomerViewModel;

namespace Project_Talent.Server.Services.Interfaces
{
    public interface ICustomerServices
    {
        public Task<int> CreateCustomer(CreateCustomerViewModel model);
        public Task<List<CustomerViewModel>> GetCustomers();
        public Task<CustomerViewModel> GetCustomersById(int id);

        public Task<CustomerViewModel> EditCustomer(CustomerViewModel viewModel);
        public Task<bool> DeleteCustomer(int id);
    }
}
