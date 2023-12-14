using AutoMapper;
using Project_Talent.Server.Models;
using Project_Talent.Server.ViewModels.CustomerViewModel;

namespace Project_Talent.Server.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Customer, CustomerViewModel>();
        }
    }
}
