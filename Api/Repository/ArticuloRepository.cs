using ApiTienda.DTO;
using ApiTienda.Repository.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using TiendaApi.Repository;
using TiendaApi.Repository.Interfaces;

namespace ApiTienda.Repository
{
    public class ArticuloRepository: IArticulo
    {
        private AppDBContext _dbContext;
        private IMapper _mapper;

        public ArticuloRepository(AppDBContext _context, IMapper mapper)
        {
            this._dbContext = _context;
            this._mapper = mapper;
        }

        public async Task<List<ArticuloDTO>> ArticulosXTienda(int _idTienda)
        {
            try
            {
                return _mapper.Map<List<ArticuloDTO>>( _dbContext.Articulos.FromSqlInterpolated($"exec ConsultaArtXTienda @idTienda={_idTienda}").AsAsyncEnumerable());
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<int> GuardarArticuloXTienda(TiendaDTO _tienda)
        {
            try {
                await _dbContext.Articulo_Tienda.Where(t => t.IdTienda == _tienda.IdTienda).ExecuteDeleteAsync();

                foreach (var art in _tienda.Articulos)
                {
                    var _ArticuloTienda = new Articulo_Tienda
                    {
                        IdTienda = _tienda.IdTienda,
                        Codigo = art.Codigo,
                        Fecha = DateTime.Now
                    };
                    await _dbContext.Articulo_Tienda.AddAsync(_ArticuloTienda);
                }
                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return 0;
            }  
        }

        public async Task<ArticuloDTO> ObtenerArticuloById(string _codigo)
        {
            try
            {
                return  _mapper.Map<ArticuloDTO>(await _dbContext.Articulos.FirstOrDefaultAsync(c => c.Codigo == _codigo));
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<List<ArticuloDTO>> ObtenerArticulos()
        {
            try
            {
                return _mapper.Map<List<ArticuloDTO>>(await _dbContext.Articulos.ToListAsync());
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<int> CrearArticulo(Articulo _Articulo)
        {
            try
            {
                await _dbContext.Articulos.AddAsync(_Articulo);
                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return 0;
            }
        }

        public async Task<int> ActualizarArticulo(Articulo _Articulo)
        {
            try
            {
                var ArticuloExiste = await _dbContext.Articulos.FirstOrDefaultAsync(c => c.Codigo == _Articulo.Codigo);
                if (ArticuloExiste != null)
                {
                    ArticuloExiste.Descripcion = _Articulo.Descripcion;
                    ArticuloExiste.Precio = _Articulo.Precio;
                    ArticuloExiste.Imagen = _Articulo.Imagen;
                }

                return await _dbContext.SaveChangesAsync();

            }
            catch(Exception e)
            {
                return 0;
            }
            
        }

        public async Task<int> EliminarArticulo(string _codigo)
        {
            try
            {
                var _borrado = await _dbContext.Articulos.FirstOrDefaultAsync(c => c.Codigo == _codigo);
                if (_borrado == null)
                {
                    return 0;
                }
                _dbContext.Articulos.Remove(_borrado!);

                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return 0;
            }
        }
    }
}
