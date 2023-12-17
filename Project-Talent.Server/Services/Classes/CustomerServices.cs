using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Project_Talent.Server.Models;
using Project_Talent.Server.Services.Interfaces;
using Project_Talent.Server.ViewModels.CustomerViewModel;

namespace Project_Talent.Server.Services.Classes
{
    public class CustomerServices : ICustomerServices
    {
        private readonly TalentDBContext _context;
        private readonly IMapper _mapper;

        public CustomerServices(TalentDBContext context, IMapper mapper) 
        { 
            _context = context;
            _mapper = mapper;

        }

        public async Task<List<CustomerViewModel>> GetCustomers()
        {
            var customers = await _context.Customers               
                .ToListAsync();

            return _mapper.Map<List<CustomerViewModel>>(customers);
        }
        public async Task<CustomerViewModel> GetCustomersById(int id)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync( c => c.Id == id );
            
            return _mapper.Map<CustomerViewModel>( customer );


        }


        public async Task<int> CreateCustomer(CreateCustomerViewModel model)
        {
            var customer = new Customer()
            {
                Name = model.Name,
                Address = model.Address
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return customer.Id;
        }
        public async Task<CustomerViewModel> EditCustomer(CustomerViewModel model)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync( c => c.Id == model.Id );

            if (customer == null)
            {
                throw new ApplicationException();
            }

            customer.Name = model.Name;
            customer.Address = model.Address;

           _context.Customers.Update(customer);
            await _context.SaveChangesAsync();

            return _mapper.Map<CustomerViewModel>(customer);
        }
        public async Task<bool> DeleteCustomer(int id)
        {

                var cust = new Customer() { Id = id };
            var foundCustomer = await _context.Customers.FindAsync(cust.Id);

                _context.Customers.Remove(foundCustomer);
            await _context.SaveChangesAsync();
                return true;          


 

        }
    }
}
