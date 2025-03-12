using ApiTienda.DTO;
using ApiTienda.Repository.Entities;
using Microsoft.AspNetCore.Mvc;

namespace TiendaApi.Repository.Interfaces
{
    public interface ICliente
    {
        Task<List<ClienteDTO>> ObtenerClientes();
        Task<ClienteDTO> ObtenerClienteById(int _idCliente);
        Task<int> CrearCliente(Cliente _cliente);
        Task<int> EliminarCliente(int _idCliente);
        Task<int> ActualizarCliente(Cliente _cliente);
        Task<int> GuardarArticulos(ClienteDTO _cliente);
    }
}
