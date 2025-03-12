using ApiTienda.DTO;
using ApiTienda.Repository;
using ApiTienda.Repository.Entities;
using ApiTienda.Utilis;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations;
using TiendaApi.Repository;
using TiendaApi.Repository.Interfaces;

namespace TiendaApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly ICliente _clienteRepository;
        private readonly UtilsJwt _utilJwt;
        public ClientesController(ICliente clienteRepository, UtilsJwt utilJwt) {
            this._clienteRepository = clienteRepository;
            this._utilJwt = utilJwt;
        }

        [HttpGet]
        [Route("lista")]
        public async Task<ActionResult<List<ClienteDTO>>> Obtener()
        {
            var _clientes =  await _clienteRepository.ObtenerClientes();
            if (_clientes == null)
            {
                return NotFound();
            }
            return Ok(_clientes);
        }

        [HttpGet]
        [Route("idCliente")]
        public async Task<ActionResult<ClienteDTO>> ObtenerById(int IdCliente)
        {
            var _cliente = await _clienteRepository.ObtenerClienteById(IdCliente);
            if (_cliente == null)
            {
                return NotFound();
            }
            return Ok(_cliente);
        }

        [HttpPost]
        [Route("crear")]
        public async Task<ActionResult> CrearCliente(ClienteDTO _clienteDTO)
        {
            var cliente = new Cliente()
            {
                Nombre = _clienteDTO.Nombre,
                Apellidos = _clienteDTO.Apellidos,
                Direccion = _clienteDTO.Direccion,
                Clave = _utilJwt.encriptarSHA256(_clienteDTO.Clave)
            };

            var resp = await _clienteRepository.CrearCliente(cliente);
            if (resp == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPut]
        [Route("actualizar")]
        public async Task<ActionResult> ActualizarCliente(Cliente cliente)
        {
            var resp = await _clienteRepository.ActualizarCliente(cliente);
            if (resp == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<ActionResult> EliminarCliente(int idCliente)
        {
            var resp = await _clienteRepository.EliminarCliente(idCliente);
            if (resp == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        [Route("guardarArticulos")]
        public async Task<ActionResult> GuardarArticulos(ClienteDTO cliente)
        {
            var resp = await _clienteRepository.GuardarArticulos(cliente);
            if (resp == 0)
            {
                return NotFound();
            }
            return Ok();
        }

    }
}
