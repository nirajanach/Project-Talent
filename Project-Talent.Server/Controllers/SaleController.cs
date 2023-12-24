using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_Talent.Server.Services.Classes;
using Project_Talent.Server.Services.Interfaces;
using Project_Talent.Server.ViewModels.SaleViewModel;
using Project_Talent.Server.ViewModels.StoreViewModel;

namespace Project_Talent.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private readonly ISaleServices _saleService;

        public SaleController(ISaleServices saleService)
        {
            _saleService = saleService;
        }


        // GET: SaleController

        [HttpGet]
        [Produces(typeof(IEnumerable<SaleViewModel>))]
        public async Task<ActionResult> Get()
        {
            var sales = await _saleService.GetSales();
            return Ok(sales);
        }

        // GET: SaleController/Details/5
        [HttpGet("id")]
        [Produces(typeof(SaleViewModel))]
        public async Task<ActionResult> GetById([FromQuery] int id)
        {

            if (id == null)
            {
                return NotFound($"No Ids given");
            }
            var sale = await _saleService.GetSaleById(id);

            if (sale is null)
            {
                return NotFound($"Sale with {id} not found.");


            }

            return Ok(sale);
        }


        // POST: SaleController/Create
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreateSaleViewModel model)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var sale = await _saleService.CreateSale(model);
            return Ok(sale);
        }

        // PUT api/<StoreController>/<id>
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] SaleViewModel model)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var sale = await _saleService.EditSale(model);
            return Ok(sale);
        }

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
                await _saleService.DeleteSale(id);

            }
            return Ok(id);

        }

    }
}
