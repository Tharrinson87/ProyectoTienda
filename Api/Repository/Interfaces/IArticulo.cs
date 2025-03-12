using ApiTienda.DTO;
using ApiTienda.Repository.Entities;
using Microsoft.AspNetCore.Mvc;

namespace TiendaApi.Repository.Interfaces
{
    public interface IArticulo
    {
        Task<List<ArticuloDTO>> ObtenerArticulos();
        Task<List<ArticuloDTO>> ArticulosXTienda(int _idTienda);
        Task<ArticuloDTO> ObtenerArticuloById(string _codigo);
        Task<int> CrearArticulo(Articulo _Articulo);
        Task<int> EliminarArticulo(string _codigo);
        Task<int> ActualizarArticulo(Articulo _Articulo);
        Task<int> GuardarArticuloXTienda(TiendaDTO _tienda);
    }
}
