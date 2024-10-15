using Services.Interfaces;

namespace webApi.Controllers
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
