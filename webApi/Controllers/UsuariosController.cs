using Services.Interfaces;

namespace WebApi.Controllers
{
    public class UsuariosController
    {
        private readonly IUsuarioService usuarioService;
        public UsuariosController(IUsuarioService usuarioService)
        {
            this.usuarioService = usuarioService;
        }
    }
}
