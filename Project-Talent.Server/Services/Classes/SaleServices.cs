using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Project_Talent.Server.Models;
using Project_Talent.Server.Models.Dto;
using Project_Talent.Server.Services.Interfaces;
using Project_Talent.Server.ViewModels.SaleViewModel;

namespace Project_Talent.Server.Services.Interfaces
{
    public class SaleServices : ISaleServices
    {
        private readonly TalentDBContext _context;
        private readonly IMapper _mapper;

        public SaleServices(TalentDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<SaleDto>> GetSales()
        {
            
            var sales = new List<SaleDto>();

            foreach (Sale item in _context.Sales)
            {
                var customer = await _context.Customers.FirstOrDefaultAsync(customer => customer.Id == item.CustomerId);
                var product = await _context.Products.FirstOrDefaultAsync(product => product.Id == item.ProductId);
                var store = await _context.Stores.FirstOrDefaultAsync(store => store.Id == item.StoreId);

                var sale = new SaleDto()
                {
                    Id = item.Id,
                    CustomerName = customer?.Name,
                    ProductName = product?.Name,
                    StoreName = store?.Name,
                    DateSold = item.DateSold,
                };

                sales.Add(sale);
            }

            

            return sales;


        }

        public async Task<SaleViewModel> GetSaleById(int id)
        {
            var sale = await _context.Sales.FirstOrDefaultAsync(s => s.Id == id);

            return _mapper.Map<SaleViewModel>(sale);


        }


        public async Task<string> CreateSale(SaleViewModel model)
        {
            var sale = new Sale()
            {
                DateSold = model.DateSold,
                CustomerId = model.CustomerId,
                StoreId = model.StoreId,
                ProductId = model.ProductId,
                Customer = await _context.Customers.FirstOrDefaultAsync(customer => customer.Id == model.CustomerId),
                Store = await _context.Stores.FirstOrDefaultAsync(store => store.Id == model.StoreId),
                Product = await _context.Products.FirstOrDefaultAsync(product => product.Id == model.ProductId),
                
            };

            _context.Sales.Add(sale);
            await _context.SaveChangesAsync();

            string result = $"Sale with the sale id: {sale.Id} has been created";

            return result;

        }

        public async Task<SaleViewModel> EditSale(SaleViewModel model)
        {
            var sale = await _context.Sales.FirstOrDefaultAsync(s => s.Id == model.Id);

            if (sale == null)
            {
                throw new ApplicationException();
            }
            sale.CustomerId = model.CustomerId;
            sale.ProductId = model.ProductId;
            sale.StoreId = model.StoreId;
            sale.DateSold = model.DateSold;


            _context.Sales.Update(sale);
            await _context.SaveChangesAsync();

            return _mapper.Map<SaleViewModel>(sale);
        }

        public async Task<string> DeleteSale(int id)
        {

            var sale = new Sale() { Id = id };
            var foundSale = await _context.Sales.FindAsync(sale.Id);

            _context.Sales.Remove(foundSale);
            await _context.SaveChangesAsync();

            return "Deleted Successfully";




        }
    }
}
