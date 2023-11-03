using Microsoft.AspNetCore.Mvc;
using WebApiLibro.Entidades;

namespace WebApiLibro.Controllers;

[ApiController]
[Route("[controller]")]
public class LoginController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<LoginController> _logger;
    private readonly DataContext _dataContext;//accede a la base de datos

    public LoginController(ILogger<LoginController> logger, DataContext dataContext)//pasa el acceso a la bse de datos
    {
        _logger = logger;
        _dataContext = dataContext;
    }

    [HttpGet]//obtener los datos de la tabla libro
    public ActionResult Get()
    {
        return Ok(_dataContext.Usuarios);
       
    }
    [HttpPost]//añadir registro
    public ActionResult Add(Login element)
    {
        _dataContext.Usuarios.Add(element);//añade una fila nueva con el nuevo registro en la tabla Libro
        _dataContext.SaveChanges();//guarda los cambios
        return Ok(element);//devuelve un ok del elemento
       
    }
    
     [HttpDelete("{id}")]//Eliminar registro
    public IActionResult Delete(int id)
    {
        var itemToDelete = _dataContext.Usuarios.FirstOrDefault(w => w.Id == id);
        if(itemToDelete == null)
        {
            return NotFound();
        }
        _dataContext.Usuarios.Remove(itemToDelete);
        _dataContext.SaveChanges();//guarda los cambios
        return NoContent();//devuelve un ok del elemento
       
    }
      [HttpPut]//Modificar registro
    public IActionResult UpDate(Login updatedItem)
    {
        var existingItem = _dataContext.Usuarios.FirstOrDefault(w => w.Id == updatedItem.Id);
        if(existingItem == null)
        {
            return NotFound();//devuelve un 404 si el elemento no se encuetra
        }
        // Actualiza los campos necesarios del elemento existente
        existingItem.Usuario = updatedItem.Usuario;
        existingItem.Clave = updatedItem.Clave;

        _dataContext.SaveChanges();
        return NoContent();//Devuelve un 204 despues de actualizar el elemento
       
    }

    
}
