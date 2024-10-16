using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class UsuarioDto
    {
        public int dni { get; set; }
        public string email { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
    }
}
