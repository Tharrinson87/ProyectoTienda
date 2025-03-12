using ApiTienda.Repository.Entities;
using ApiTienda.Repository.Interfaces;
using ApiTienda.Utilis;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ApiTienda.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class AccesoController : ControllerBase
    {
        private readonly UtilsJwt _utilJwt;
        private readonly IAcceso _accesoRespository;

        public AccesoController(IAcceso _acceso, UtilsJwt _utils)
        {
            this._utilJwt = _utils;
            this._accesoRespository = _acceso;
        }

        [HttpPost]
        [Route("loginCliente")]
        public async Task<IActionResult>LoginCliente(Cliente cliente)
        {
            var usuario = await _accesoRespository.LoginCliente(cliente, _utilJwt.encriptarSHA256(cliente.Clave));
            if(usuario == null)
            {
                return NotFound();
            }
            return StatusCode(StatusCodes.Status200OK, new { isSusses = true, token=_utilJwt.generarJWT(usuario.IdCliente.ToString(), usuario.Nombre), cliente = JsonConvert.SerializeObject(usuario) });
        }

        [HttpPost]
        [Route("loginAdmin")]
        public async Task<IActionResult> LoginAdministrador(Administrador admin)
        {
            var usuario = await _accesoRespository.LoginAdmin(admin, _utilJwt.encriptarSHA256(admin.Clave));
            if (usuario == null)
            {
                return NotFound();
            }
            return StatusCode(StatusCodes.Status200OK, new { isSusses = true, token = _utilJwt.generarJWT(usuario.Clave, usuario.Usuario) });
        }
    }
}
