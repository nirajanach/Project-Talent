using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_Talent.Server.Services.Classes;
using Project_Talent.Server.Services.Interfaces;
using Project_Talent.Server.ViewModels.ProductViewModel;

namespace Project_Talent.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductServices _productServices;

        public ProductController(IProductServices productServices)
        {
            _productServices = productServices;
        }
        // GET: ProductController
        [HttpGet]
        [Produces(typeof(IEnumerable<ProductViewModel>))]
        public async Task<ActionResult> Get()
        {
            var products = await _productServices.GetProducts();
            return Ok(products);
        }

        // GET api/<ProductController>/id
        [HttpGet("id")]
        [Produces(typeof(ProductViewModel))]
        public async Task<IActionResult> GetById([FromQuery] int id)
        {
            if (id == null)
            {
                return NotFound($"No Id is given");
            }

            var product = await _productServices.GetProductById(id);

            if (product is null)
            {
                return NotFound($"Product with {id} not found.");

            }
            return Ok(product);
        }


        // POST api/<ProductController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateProductViewModel model)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var product = await _productServices.CreateProduct(model);
            return Ok(product);
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] ProductViewModel model)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var product = await _productServices.EditProduct(model);
            return Ok(product);
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            //var custId = await _ProductService.GetProductsById(id);

            if (id == null)
            {
                return NotFound($"Product with {id} not found.");

            }
            else
            {
                await _productServices.DeleteProduct(id);

            }
            return Ok(id);

        }
    }
}

