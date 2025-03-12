using ApiTienda.Repository.Entities;

namespace ApiTienda.DTO
{
    public class ArticuloDTO
    {
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public byte[] Imagen { get; set; }
        public string strImagen { get; set; }
        public int Stock { get; set; }
        public int Cantidad { get; set; }
    }
}
