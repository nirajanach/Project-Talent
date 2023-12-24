using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Project_Talent.Server.Models;
using Project_Talent.Server.Services.Interfaces;
using Project_Talent.Server.ViewModels.ProductViewModel;

namespace Project_Talent.Server.Services.Classes;

public class ProductServices : IProductServices
{
    private readonly TalentDBContext _context;
    private readonly IMapper _mapper;

    public ProductServices(TalentDBContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
        
    }

    public async Task<List<ProductViewModel>> GetProducts()
    {
        var products = await _context.Products
            .ToListAsync();
        return _mapper.Map<List<ProductViewModel>>(products);
    }

    public async Task<ProductViewModel> GetProductById(int id)
    {
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);

        return _mapper.Map<ProductViewModel>(product);


    }


    public async Task<int> CreateProduct(CreateProductViewModel model)
    {
        var product = new Product()
        {
            Name = model.Name,
            Price = model.Price
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return product.Id;
    }
    public async Task<ProductViewModel> EditProduct(ProductViewModel model)
    {
        var product = await _context.Products.FirstOrDefaultAsync(c => c.Id == model.Id);

        if (product == null)
        {
            throw new ApplicationException();
        }

        product.Name = model.Name;
        product.Price = model.Price;

        _context.Products.Update(product);
        await _context.SaveChangesAsync();

        return _mapper.Map<ProductViewModel>(product);
    }
    public async Task<bool> DeleteProduct(int id)
    {

        var product = new Product() { Id = id };
        var foundProducts = await _context.Products.FindAsync(product.Id);

        _context.Products.Remove(foundProducts);
        await _context.SaveChangesAsync();
        return true;

    }
}