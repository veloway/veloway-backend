using Data.Context;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;
using Services.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//PostgreSQL connection
//var connectionString = builder.Configuration.GetConnectionString("PostgreSQLConnection");
DotNetEnv.Env.Load();
string dbUser = Environment.GetEnvironmentVariable("POSTGRE_USER");
string dbPassword = Environment.GetEnvironmentVariable("POSTGRE_PASSWORD");
string dbHost = Environment.GetEnvironmentVariable("POSTGRE_HOST");
string db = Environment.GetEnvironmentVariable("POSTGRE_DB");
// Usar las variables para construir la cadena de conexión
string connectionString = $"Server={dbHost};Database={db};User Id={dbUser};Password={dbPassword};";
builder.Services.AddDbContext<VelowayDbContext>(options => options.UseNpgsql(connectionString));

//Inyeccion de dependencias
builder.Services.AddScoped<IUsuarioService, UsuarioService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
