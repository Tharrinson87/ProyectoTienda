using System.ComponentModel.DataAnnotations;

namespace ApiTienda.Repository.Entities
{
    public class Cliente
    {
        [Key]
        public int IdCliente { get; set; }
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Direccion { get; set; }

        public string Clave { get; set; }
    }
}
