using Data.Context;

namespace Services.Services
{
    public class UsuarioService
    {
        private readonly VelowayDbContext db;
        public UsuarioService(VelowayDbContext db)
        {
            this.db = db;
        }
    }
}
