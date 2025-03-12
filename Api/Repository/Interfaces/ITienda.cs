using ApiTienda.DTO;
using ApiTienda.Repository.Entities;
using Microsoft.AspNetCore.Mvc;

namespace TiendaApi.Repository.Interfaces
{
    public interface ITienda
    {
        Task<List<TiendaDTO>> ObtenerTiendas();
        Task<TiendaDTO> ObtenerTiendaById(int _idTienda);
        Task<int> CrearTienda(Tienda _Tienda);
        Task<int> EliminarTienda(int _idTienda);
        Task<int> ActualizarTienda(Tienda _Tienda);
    }
}
