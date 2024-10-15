using Services.Interfaces;

namespace WebApi.Controllers
{
    public class EnviosController
    {
        private readonly IEnvioService envioService;
        public EnviosController(IEnvioService envioService)
        {
            this.envioService = envioService;
        }
    }
}
