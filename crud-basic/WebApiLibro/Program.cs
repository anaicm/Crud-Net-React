using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);
//---Cadena de conexión
builder.Services.AddDbContext<DataContext>
(options=>options.UseSqlServer
(@"Data Source=PORTATIL\SQLEXPRESS;Initial Catalog=biblioteca;User Id=sa;Password=rootadmin;Encrypt=false"));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//--distinto dominio habilitar las cors
builder.Services.AddCors(options=>
{
    options.AddPolicy("AllowAll", builder =>{
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });

});

var app = builder.Build();
//--añadir para que no bloquee en el front
app.UseCors("AllowAll");

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