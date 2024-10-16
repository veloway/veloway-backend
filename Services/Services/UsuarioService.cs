using Data.Context;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;

namespace Services.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly VelowayDbContext db;
        public UsuarioService(VelowayDbContext db)
        {
            this.db = db;
        }

        public async Task<List<Usuario>> getAll()
        {
            return await db.Usuarios.ToListAsync();
        }
    }
}
