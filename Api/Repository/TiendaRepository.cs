using ApiTienda.DTO;
using ApiTienda.Repository.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TiendaApi.Repository;
using TiendaApi.Repository.Interfaces;

namespace ApiTienda.Repository
{
    public class TiendaRepository : ITienda
    {
        private AppDBContext _dbContext;
        private IMapper _mapper;

        public TiendaRepository(AppDBContext _context, IMapper mapper)
        {
            this._dbContext = _context;
            this._mapper = mapper;
        }

        public async Task<TiendaDTO> ObtenerTiendaById(int _IdTienda)
        {
            try
            {
                return _mapper.Map<TiendaDTO>(await _dbContext.Tiendas.FirstOrDefaultAsync(c => c.IdTienda == _IdTienda));
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<List<TiendaDTO>> ObtenerTiendas()
        {
            try
            {
                return _mapper.Map<List<TiendaDTO>>(await _dbContext.Tiendas.ToListAsync());
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<int> CrearTienda(Tienda _Tienda)
        {
            try
            {
                await _dbContext.Tiendas.AddAsync(_Tienda);
                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return 0;
            }

        }

        public async Task<int> ActualizarTienda(Tienda _Tienda)
        {
            try
            {
                var TiendaExiste = await _dbContext.Tiendas.FirstOrDefaultAsync(c => c.IdTienda == _Tienda.IdTienda);
                if (TiendaExiste != null)
                {
                    TiendaExiste.Direccion = _Tienda.Direccion;
                }

                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return 0;
            }
        }

        public async Task<int> EliminarTienda(int _IdTienda)
        {
            try
            {
                var _borrado = await _dbContext.Tiendas.FirstOrDefaultAsync(c => c.IdTienda == _IdTienda);
                if (_borrado == null)
                {
                    return 0;
                }
                _dbContext.Tiendas.Remove(_borrado!);

                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return 0;
            }
        }
    }
}
