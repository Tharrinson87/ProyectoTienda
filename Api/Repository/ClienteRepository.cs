using ApiTienda.DTO;
using ApiTienda.Repository;
using ApiTienda.Repository.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using TiendaApi.Repository.Interfaces;

namespace TiendaApi.Repository
{
    public class ClienteRepository : ICliente
    {
        private AppDBContext _dbContext;
        private IMapper _mapper;

        public ClienteRepository(AppDBContext _context, IMapper mapper)
        {
            this._dbContext = _context;
            this._mapper = mapper;
        }

        public async Task<ClienteDTO> ObtenerClienteById(int _idCliente)
        {
            try
            {
                return _mapper.Map<ClienteDTO>(await _dbContext.Clientes.FirstOrDefaultAsync(c => c.IdCliente == _idCliente));
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<List<ClienteDTO>> ObtenerClientes()
        {
            try
            {
                return _mapper.Map<List<ClienteDTO>>(await _dbContext.Clientes.ToListAsync());
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<int> CrearCliente(Cliente _cliente)
        {
            try
            {
                await _dbContext.Clientes.AddAsync(_cliente);
                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return 0;
            }
        }

        public async Task<int> ActualizarCliente(Cliente _cliente)
        {
            try
            {
                var clienteExiste = await _dbContext.Clientes.FirstOrDefaultAsync(c => c.IdCliente == _cliente.IdCliente);
                if (clienteExiste != null)
                {
                    clienteExiste.Nombre = _cliente.Nombre;
                    clienteExiste.Apellidos = _cliente.Apellidos;
                    clienteExiste.Direccion = _cliente.Direccion;
                }

                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return 0;
            }
        }

        public async Task<int> EliminarCliente(int _idCliente)
        {
            try
            {
                var _borrado = await _dbContext.Clientes.FirstOrDefaultAsync(c => c.IdCliente == _idCliente);
                if (_borrado == null)
                {
                    return 0;
                }
                _dbContext.Clientes.Remove(_borrado!);

                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return 0;
            }
        }

        public async Task<int> GuardarArticulos(ClienteDTO _cliente)
        {
            try
            {
                foreach (var art in _cliente.Articulos)
                {
                    var _ArticuloCliente = new Cliente_Articulo
                    {
                        IdCliente = _cliente.IdCliente,
                        Codigo = art.Codigo,
                        Fecha = DateTime.Now
                    };
                    await _dbContext.Cliente_Articulo.AddAsync(_ArticuloCliente);
                }
                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return 0;
            }
        }
    }
}
