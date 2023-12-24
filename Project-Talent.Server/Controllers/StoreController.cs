using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_Talent.Server.Services.Interfaces;
using Project_Talent.Server.ViewModels.StoreViewModel;

namespace Project_Talent.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase   
    {
        private readonly IStoreServices _storeService;

        public StoreController(IStoreServices storeService)
        {
            _storeService = storeService;
        }


        // GET: api/<StoreController>

        [HttpGet]
        [Produces(typeof(IEnumerable<StoreViewModel>))]
        public async Task<IActionResult> Get()
        {
            var stores = await _storeService.GetStores();
            return Ok(stores);
        }


        // GET api/<StoreController>/5
        [HttpGet("id")]
        [Produces(typeof(StoreViewModel))]
        public async Task<IActionResult> GetById([FromQuery] int id)
        {
            if (id == null)
            {
                return NotFound($"No Ids given");


            }

            var store = await _storeService.GetStoreById(id);

            if (store is null)
            {
                return NotFound($"Store with {id} not found.");


            }
            return Ok(store);
        }

        // POST api/<StoreController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateStoreViewModel model)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var store = await _storeService.CreateStore(model);
            return Ok(store);
        }

        // PUT api/<StoreController>/<id>
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] StoreViewModel model)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var store = await _storeService.EditStore(model);
            return Ok(store);
        }

        // DELETE api/<StoreController>/<id>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            //var storetId = await _storeService.GetStoresById(id);

            if (id == null)
            {
                return NotFound($"Store with {id} not found.");

            }
            else
            {
                await _storeService.DeleteStore(id);

            }
            return Ok(id);

        }

    }
}
