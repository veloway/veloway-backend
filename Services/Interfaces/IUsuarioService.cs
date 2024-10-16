using Data.Models;

namespace Services.Interfaces
{
    public interface IUsuarioService
    {
        Task<List<Usuario>> getAll();
       
    }
}
