using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Project_Talent.Server.Models;
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

        public async Task<List<SaleViewModel>> GetSales()
        {
            var sales = await _context.Sales.ToListAsync();

            return _mapper.Map<List<SaleViewModel>>(sales);


        }

        public async Task<SaleViewModel> GetSaleById(int id)
        {
            var sale = await _context.Sales.FirstOrDefaultAsync(s => s.Id == id);

            return _mapper.Map<SaleViewModel>(sale);


        }


        public async Task<string> CreateSale(CreateSaleViewModel model)
        {
            var sale = new Sale()
            {
                DateSold = model.DateSold,
                Customer = model.Customer,
                Store = model.Store,
                Product = model.Product
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
            sale.Customer = model.Customer;
            sale.Product = model.Product;
            sale.Store = model.Store;

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
