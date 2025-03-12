using ApiTienda.Repository.Entities;

namespace ApiTienda.DTO
{
    public class TiendaDTO
    {
        public int IdTienda { get; set; }
        public string Sucursal { get; set; }
        public string Direccion { get; set; }
        public List<Articulo> Articulos { get; set;}
    }
}
