using ApiTienda.Repository.Entities;

namespace ApiTienda.DTO
{
    public class ClienteDTO
    {
        public int IdCliente { get; set; }
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Direccion { get; set; }
        public string Clave {  get; set; }
        public List<Articulo> Articulos { get; set; }

    }
}
