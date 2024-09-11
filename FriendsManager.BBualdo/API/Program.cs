using API.Helpers;
using Contracts;
using Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using Repository;
using Services;
using Microsoft.EntityFrameworkCore.SqlServer;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(options => 
  options.JsonSerializerOptions.Converters.Add(new DateOnlyJsonConverter()));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<FriendsDbContext>(options =>
  options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddScoped<IFriendsRepository, FriendsRepository>();
builder.Services.AddScoped<IRepository<Category>, Repository<Category>>();
builder.Services.AddScoped<IFriendsService, FriendsService>();
builder.Services.AddScoped<ICategoriesService, CategoriesService>();
builder.Services.AddCors(options => 
  options.AddPolicy("policy", builder =>
    builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("policy");

app.MapControllers();

app.Run();