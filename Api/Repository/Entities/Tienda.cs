using System.ComponentModel.DataAnnotations;

namespace ApiTienda.Repository.Entities
{
    public class Tienda
    {
        [Key]
        public int IdTienda { get; set; }
        public string Sucursal { get; set; }
        public string Direccion { get; set; }
    }
}
