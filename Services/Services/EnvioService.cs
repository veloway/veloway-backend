using Data.Context;

namespace Services.Services
{
    public class EnvioService
    {
        private readonly VelowayDbContext db;
        public EnvioService(VelowayDbContext db)
        {
            this.db = db;
        }
    }
}
