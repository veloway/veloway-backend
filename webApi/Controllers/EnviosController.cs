using Services.Interfaces;

namespace webApi.Controllers
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
