using FriendsManager.Database;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// below option stops the loops from happening when getting, but I think its wrong
builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddDbContext<FriendsContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("FriendsManager") ?? throw new InvalidOperationException("Connection String not Found")));

builder.Services.AddScoped<FriendsContext>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<FriendsContext>();
    // dbContext.Database.EnsureDeleted();
    dbContext.Database.EnsureCreated();


}

app.UseCors(options => 
    options.WithOrigins("http://localhost:4200")
        .AllowAnyMethod()
        .AllowAnyHeader()
);

app.UseHttpsRedirection();

app.MapControllers();

app.Run();