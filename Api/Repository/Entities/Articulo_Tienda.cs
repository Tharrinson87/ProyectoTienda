using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ApiTienda.Repository.Entities
{
    public class Articulo_Tienda
    {
        [Key]
        public string Codigo { get; set; }
        
        public int IdTienda { get; set; }

        public DateTime Fecha { get; set; }
    }
}
