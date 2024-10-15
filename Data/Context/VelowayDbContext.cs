using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Context
{
    public class VelowayDbContext : DbContext
    {
        public VelowayDbContext(DbContextOptions<VelowayDbContext> options) : base(options)
        {

        }

        //REPRESENTACIONES DE LAS TABLAS DE LA BBDD
        public DbSet<Usuario> Usuarios => Set<Usuario>();


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configura la tabla para que use el nombre correcto
            modelBuilder.Entity<Usuario>().ToTable("usuarios");
        }

    }
}
