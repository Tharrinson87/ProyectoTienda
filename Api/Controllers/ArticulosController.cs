using ApiTienda.DTO;
using ApiTienda.Repository.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using TiendaApi.Repository.Interfaces;

namespace TiendaApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class ArticulosController : ControllerBase
    {
        private readonly IArticulo _articuloRepository;
        public ArticulosController(IArticulo articuloRepository)
        {
            this._articuloRepository = articuloRepository;
        }

        [HttpGet]
        [Route("lista")]
        public async Task<ActionResult<List<ArticuloDTO>>> Obtener()
        {
            var _articulos = await _articuloRepository.ObtenerArticulos();
            if (_articulos == null)
            {
                return NotFound();
            }
            return Ok(_articulos);
        }

        [HttpGet]
        [Route("listaXtienda")]
        public async Task<ActionResult<List<ArticuloDTO>>> ObtenerXTienda(int idTienda)
        {
            var _articulos = await _articuloRepository.ArticulosXTienda(idTienda);
            if (_articulos == null)
            {
                return NotFound();
            }
            return Ok(_articulos);
        }

        [HttpGet]
        [Route("idArticulo")]
        public async Task<ActionResult<ArticuloDTO>> ObtenerById(string _codigo)
        {
            var _articulo = await _articuloRepository.ObtenerArticuloById(_codigo);
            if (_articulo == null)
            {
                return NotFound();
            }
            return Ok(_articulo);
        }

        [HttpPost]
        [Route("crear")]
        public async Task<ActionResult> Creararticulo(ArticuloDTO articuloDTO)
        {
            var imagen = JsonConvert.DeserializeObject(articuloDTO.strImagen);
            string base64Image = imagen.ToString().Split(",")[1];
            byte[] bytes = Convert.FromBase64String(base64Image);
            var articulo = new Articulo() {
                Codigo = articuloDTO.Codigo,
                Descripcion = articuloDTO.Descripcion,
                Precio = articuloDTO.Precio,
                Imagen = bytes,
                Stock = articuloDTO.Stock,
            };

            var resp = await _articuloRepository.CrearArticulo(articulo);
            if (resp == 0)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        [Route("guardarXTienda")]
        public async Task<ActionResult> GuardarArticuloXTienda(TiendaDTO tienda)
        {
            var resp = await _articuloRepository.GuardarArticuloXTienda(tienda);
            if (resp == 0)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPut]
        [Route("actualizar")]
        public async Task<ActionResult> Actualizararticulo(ArticuloDTO articuloDTO)
        {
            var imagen = JsonConvert.DeserializeObject(articuloDTO.strImagen);
            string base64Image = imagen.ToString().Replace("data:image/jpeg;base64,", "");
            byte[] bytes = Convert.FromBase64String(base64Image);
            var articulo = new Articulo()
            {
                Codigo = articuloDTO.Codigo,
                Descripcion = articuloDTO.Descripcion,
                Precio = articuloDTO.Precio,
                Imagen = bytes,
                Stock = articuloDTO.Stock,
            };

            var resp = await _articuloRepository.ActualizarArticulo(articulo);
            if (resp == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<ActionResult> Eliminararticulo(string codigo)
        {
            var resp = await _articuloRepository.EliminarArticulo(codigo);
            if (resp == null)
            {
                return NotFound();
            }
            return Ok();
        }

    }
}
