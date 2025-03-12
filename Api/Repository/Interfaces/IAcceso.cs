using ApiTienda.DTO;
using ApiTienda.Repository.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ApiTienda.Repository.Interfaces
{
    public interface IAcceso
    {
        Task<Cliente> LoginCliente(Cliente _cliente, string clave);
        Task<Administrador> LoginAdmin(Administrador _admin, string clave);
    }
}
