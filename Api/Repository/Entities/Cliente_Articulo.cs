using System.ComponentModel.DataAnnotations;

namespace ApiTienda.Repository.Entities
{
    public class Cliente_Articulo
    {
        [Key]
        public int IdCliente { get; set; }
        public string Codigo { get; set; }
        public DateTime Fecha { get; set; }
    }
}
