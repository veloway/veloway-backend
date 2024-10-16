using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class Usuario
    {
        [Key]
        public int dni { get; set; }
        public required string email { get; set; }
        public required string password { get; set; }
        [Column("fecha_nac")]
        public required DateOnly fechaNac { get; set; }
        public required string nombre { get; set; }
        public required string apellido { get; set; }
        [Column("es_conductor")]
        public required Boolean esConductor { get; set; }
        public string? telefono { get; set; }
        [Column("id_domicilio")]
        [ForeignKey("id_domicilio")]
        public required int idDomicilio { get; set; }

    }
}
