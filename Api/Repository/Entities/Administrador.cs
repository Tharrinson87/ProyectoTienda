using System.ComponentModel.DataAnnotations;

namespace ApiTienda.Repository.Entities
{
    public class Administrador
    {
        [Key]
        public string Usuario { get; set; }
        public string Clave { get; set; }
    }
}
