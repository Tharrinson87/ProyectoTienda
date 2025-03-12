using ApiTienda.DTO;
using ApiTienda.Repository.Entities;
using ApiTienda.Repository.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TiendaApi.Repository;

namespace ApiTienda.Repository
{
    public class AccesoRepository: IAcceso
    {
        private AppDBContext _dbContext;

        public AccesoRepository(AppDBContext _context, IMapper mapper)
        {
            this._dbContext = _context;
        }

        public async Task<Cliente> LoginCliente(Cliente _cliente, string clave)
        {
            return await _dbContext.Clientes.Where(c => 
                        c.Clave == clave && c.Nombre == _cliente.Nombre)
                .FirstOrDefaultAsync();

        }

        public async Task<Administrador> LoginAdmin(Administrador _admin, string clave)
        {
            return await _dbContext.Administrador.Where(c =>
                        c.Clave == clave && c.Usuario == _admin.Usuario)
                .FirstOrDefaultAsync();

        }
    }
}
