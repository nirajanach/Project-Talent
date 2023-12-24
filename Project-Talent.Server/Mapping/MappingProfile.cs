using AutoMapper;
using Project_Talent.Server.Models;
using Project_Talent.Server.ViewModels.CustomerViewModel;
using Project_Talent.Server.ViewModels.ProductViewModel;
using Project_Talent.Server.ViewModels.SaleViewModel;
using Project_Talent.Server.ViewModels.StoreViewModel;

namespace Project_Talent.Server.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Customer, CustomerViewModel>();

            CreateMap<Product, ProductViewModel>();

            CreateMap<Store, StoreViewModel>();

            CreateMap<Sale, SaleViewModel>();
        }
    }
}
