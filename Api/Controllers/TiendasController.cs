using ApiTienda.DTO;
using ApiTienda.Repository.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TiendaApi.Repository.Interfaces;

namespace TiendaApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class TiendasController : ControllerBase
    {
        private readonly ITienda _tiendaRepository;
        public TiendasController(ITienda tiendaRepository)
        {
            this._tiendaRepository = tiendaRepository;
        }

        [HttpGet]
        [Route("lista")]
        public async Task<ActionResult<List<TiendaDTO>>> Obtener()
        {
            var _tiendas = await _tiendaRepository.ObtenerTiendas();
            if (_tiendas == null)
            {
                return NotFound();
            }
            return Ok(_tiendas);
        }

        [HttpGet]
        [Route("idtienda")]
        public async Task<ActionResult<TiendaDTO>> ObtenerById(int Idtienda)
        {
            var _tienda = await _tiendaRepository.ObtenerTiendaById(Idtienda);
            if (_tienda == null)
            {
                return NotFound();
            }
            return Ok(_tienda);
        }

        [HttpPost]
        [Route("crear")]
        public async Task<ActionResult> Creartienda(Tienda tienda)
        {
            var resp = await _tiendaRepository.CrearTienda(tienda);
            if (resp == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPut]
        [Route("actualizar")]
        public async Task<ActionResult> Actualizartienda(Tienda tienda)
        {
            var resp = await _tiendaRepository.ActualizarTienda(tienda);
            if (resp == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<ActionResult> Eliminartienda(int idtienda)
        {
            var resp = await _tiendaRepository.EliminarTienda(idtienda);
            if (resp == null)
            {
                return NotFound();
            }
            return Ok();
        }


    }
}
