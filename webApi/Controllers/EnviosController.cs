using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnviosController : ControllerBase
    {
        private readonly IEnvioService envioService;
        public EnviosController(IEnvioService envioService)
        {
            this.envioService = envioService;
        }
    }
}
