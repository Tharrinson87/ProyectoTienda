export interface Administrador {
    Usuario?: string;
    Clave?: string;
}

export interface Cliente{
    IdCliente: number,
    Nombre: string,
    Apellidos: string,
    Direccion: string,
    Clave: string
}

export interface Articulo{
    Codigo: string,
    Descripcion: string,
    Precio: number,
    Imagen: any,
    Stock: number
}

export interface Tienda{
    IdTienda: number,
    Sucursal: string,
    Direccion: string
}

export interface TiendaDTO{
    IdTienda: number,
    Sucursal: string,
    Direccion: string,
    Articulos: Articulo[]
}

export interface ArticuloDTO{
    Codigo: string,
    Descripcion: string,
    Precio: number,
    Imagen: any,
    strImagen: string,
    Stock: number,
    Cantidad: number
}

export interface ClienteDTO{
    IdCliente: number,
    Nombre: string,
    Apellidos: string,
    Direccion: string,
    Clave: string,
    Articulos: Articulo[]
}