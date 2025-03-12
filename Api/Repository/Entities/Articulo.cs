using System.ComponentModel.DataAnnotations;

namespace ApiTienda.Repository.Entities
{
    public class Articulo
    {
        [Key]
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public byte[] Imagen { get; set; }
        public int Stock { get; set; }
    }
}
