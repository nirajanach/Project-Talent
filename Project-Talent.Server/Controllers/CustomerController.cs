using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Project_Talent.Server.Models;
using Project_Talent.Server.Services.Interfaces;
using Project_Talent.Server.ViewModels.CustomerViewModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project_Talent.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        // GET: api/<CustomerController>
        private readonly ICustomerServices _customerService;

        public CustomerController(ICustomerServices customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        [Produces(typeof(IEnumerable<CustomerViewModel>))]
        public async Task<IActionResult> Get()
        {
            var customers = await _customerService.GetCustomers();
            return Ok(customers);
        }
        

        // GET api/<CustomerController>/5
        [HttpGet("id")]
        [Produces(typeof(CustomerViewModel))]
        public async Task<IActionResult> GetById([FromQuery]int id)
        {
            if ( id == null)
            {
                return NotFound($"No Id ids given");
            }
            
            var customer = await _customerService.GetCustomersById(id);

            if (customer is null )
            {
                return NotFound($"Customer with {id} not found.");

            }
            return Ok(customer);
        }

        // POST api/<CustomerController>
        [HttpPost]
        public async Task<IActionResult>  Post([FromBody] CreateCustomerViewModel model)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var customer = await _customerService.CreateCustomer(model);
            return Ok(customer);
        }

        // PUT api/<CustomerController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] CustomerViewModel model)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var customer = await _customerService.EditCustomer(model);
            return Ok(customer);
        }

        // DELETE api/<CustomerController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            //var custId = await _customerService.GetCustomersById(id);

            if (id == null)
            {
                return NotFound($"Customer with {id} not found.");

            }else
            {
            await _customerService.DeleteCustomer(id);

            }
            return Ok(id);

        }
    }
}
