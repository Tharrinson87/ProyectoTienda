using ApiTienda.DTO;
using ApiTienda.Repository.Entities;
using System.Runtime.CompilerServices;
using AutoMapper;

namespace ApiTienda.Utilis
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Cliente, ClienteDTO>();
            CreateMap<Articulo,ArticuloDTO>();
            CreateMap<Tienda,TiendaDTO>();
        }
    }
}
