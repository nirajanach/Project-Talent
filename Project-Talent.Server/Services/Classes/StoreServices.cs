using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Project_Talent.Server.Models;
using Project_Talent.Server.Services.Interfaces;
using Project_Talent.Server.ViewModels.StoreViewModel;

namespace Project_Talent.Server.Services.Classes
{
    public class StoreServices :IStoreServices
    {
        private readonly TalentDBContext _context;
        private readonly IMapper _mapper;

        public StoreServices(TalentDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        public async Task<List<StoreViewModel>> GetStores()
        {
            var stores = await _context.Stores
                .ToListAsync();

            return _mapper.Map<List<StoreViewModel>>(stores);
        }
        public async Task<StoreViewModel> GetStoreById(int id)
        {
            var store = await _context.Stores.FirstOrDefaultAsync(c => c.Id == id);

            return _mapper.Map<StoreViewModel>(store);


        }


        public async Task<int> CreateStore(CreateStoreViewModel model)
        {
            var store = new Store()
            {
                Name = model.Name,
                Address = model.Address
            };

            _context.Stores.Add(store);
            await _context.SaveChangesAsync();

            return store.Id;
        }
        public async Task<StoreViewModel> EditStore(StoreViewModel model)
        {
            var store = await _context.Stores.FirstOrDefaultAsync(c => c.Id == model.Id);

            if (store == null)
            {
                throw new ApplicationException();
            }
            store.Name = model.Name;
            store.Address = model.Address;

            _context.Stores.Update(store);
            await _context.SaveChangesAsync();

            return _mapper.Map<StoreViewModel>(store);
        }
        public async Task<bool> DeleteStore(int id)
        {

            var store = new Store() { Id = id };
            var foundStore = await _context.Stores.FindAsync(store.Id);

            _context.Stores.Remove(foundStore);
            await _context.SaveChangesAsync();
            return true;




        }
    }
}
