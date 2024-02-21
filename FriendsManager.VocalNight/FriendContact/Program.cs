using FriendContact.Models;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
const string corsPolicy = "any origin";
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null; // Use the default naming policy
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = false; // Honor property name casing
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicy, policy =>
        policy.WithOrigins("http://localhost:3000")
        .WithMethods("PUT", "POST", "GET", "DELETE", "OPTIONS")
          .WithHeaders("Content-Type", "Authorization"));

});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<FriendListContext>(opt =>
opt.UseSqlServer(builder.Configuration.GetConnectionString("Database")));

var app = builder.Build();
app.UseCors(corsPolicy);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var db = scope.ServiceProvider.GetRequiredService<FriendListContext>();
    db.Database.EnsureDeleted();
    db.Database.EnsureCreated();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();


app.Run();
