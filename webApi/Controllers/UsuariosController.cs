using Core.DTOs;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioService usuarioService;
        public UsuariosController(IUsuarioService usuarioService)
        {
            this.usuarioService = usuarioService;
        }

        [HttpGet] //localhost:7228/api/usuarios
        public async Task<IActionResult> getAll()
        {
            try
            {
                var usuarios = await usuarioService.getAll();
                //Adaptar el array
                var usuariosDto = usuarios.Adapt<List<UsuarioDto>>();

                return Ok(usuariosDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error Interno en el servidor {ex}");
            }
        }

    }
}
