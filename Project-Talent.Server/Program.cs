using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.HttpLogging; // HttpLoggingFields
using Project_Talent.Server.Mapping;
using Project_Talent.Server.Models;
using Project_Talent.Server.Services.Classes;
using Project_Talent.Server.Services.Interfaces;
using Microsoft.Extensions.Azure;
using System.Net.Http.Headers;
using Microsoft.Net.Http.Headers; // MediaTypeWithQualityHeaderValue

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<TalentDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddScoped<ICustomerServices,CustomerServices>();
builder.Services.AddScoped<IProductServices, ProductServices>();
builder.Services.AddScoped<IStoreServices, StoreServices>();
builder.Services.AddScoped<ISaleServices, SaleServices>();


//builder.Services.AddAut(typeof(MappingProfile));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyPolicy",
        policy =>
        {
            policy.WithOrigins("https://talentonboardingapi.azurewebsites.net",
                "https://localhost:5173")
            .WithMethods("PUT", "DELETE", "POST", "GET")
             .WithHeaders(
             HeaderNames.Origin,
             HeaderNames.ContentType,
             HeaderNames.Accept,           
             HeaderNames.XRequestedWith
             );
        });
});

//builder.Services.AddHttpLogging(options =>
//{// Add the Origin header so it will not be redacted.
//    options.RequestHeaders.Add("Origin");   
//    // By default, the response body is not included.
//    options.LoggingFields = HttpLoggingFields.All;
//});
builder.Services.AddAzureClients(clientBuilder =>
{
    clientBuilder.AddBlobServiceClient(builder.Configuration["$web:blob"], preferMsi: true);
    clientBuilder.AddQueueServiceClient(builder.Configuration["$web:queue"], preferMsi: true);
});


//builder.Services.AddHttpClient(name: "localhost",
//configureClient: options => {
//    options.BaseAddress = new("https://localhost:5173/");
//    options.DefaultRequestHeaders.Accept.Add(
//    new MediaTypeWithQualityHeaderValue(
//    "application/json", 1.0));
//});


var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseHttpsRedirection();

//app.Use((context, next) =>
//{
//context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
//    context.Response.Headers.Add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
//    context.Response.Headers.Add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//return next.Invoke();
//});
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.MapControllerRoute(
  name: "default",
  pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapFallbackToFile("/index.html");





app.Run();
