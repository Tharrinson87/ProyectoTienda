import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constantes } from './constantes';
import { Administrador, Articulo, ArticuloDTO, Cliente, ClienteDTO, Tienda, TiendaDTO } from './modelo';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constPath = Constantes.pathServices;

  public headers: any;

  constructor(private http: HttpClient) { 
    this.headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };
  }
  
  loginAdmin(admin: Administrador): Observable<any>{
    return this.http.post<any>(this.constPath + "api/Acceso/loginAdmin", admin);
  }

  loginCliente(cliente:Cliente){
    return this.http.post<any>(this.constPath + "api/Acceso/loginCliente", cliente);
  }

  getClientes(){
    return this.http.get(this.constPath + "api/Clientes/lista", this.headers);
  }

  creaCliente(_cliente: Cliente){
    return this.http.post<Cliente>(this.constPath + "api/Clientes/crear", _cliente, this.headers);
  }

  actualizaCliente(_cliente: Cliente){
    return this.http.put<Cliente>(this.constPath + "api/Clientes/actualizar", _cliente, this.headers);
  }

  eliminarCliente(_idCliente: number){
    return this.http.delete<Cliente>(this.constPath + "api/Clientes/eliminar/?idCliente=" + _idCliente, this.headers);
  }

  getArticulos(){
    return this.http.get(this.constPath + "api/Articulos/lista", this.headers);
  }

  creaArticulo(_articulo: Articulo){
    return this.http.post<Articulo>(this.constPath + "api/Articulos/crear", _articulo, this.headers);
  }

  actualizaArticulo( _articulo: ArticuloDTO){
    return this.http.put<Articulo>(this.constPath + "api/Articulos/actualizar", _articulo, this.headers);
  }

  eliminarArticulo(_idArticulo: number){
    return this.http.delete<Articulo>(this.constPath + "api/Articulos/eliminar/?codigo=" + _idArticulo, this.headers);
  }

  getTiendas(){
    return this.http.get(this.constPath + "api/Tiendas/lista", this.headers);
  }

  creaTienda(_tienda: Tienda){
    return this.http.post<Tienda>(this.constPath + "api/Tiendas/crear", _tienda, this.headers);
  }

  actualizaTienda(_tienda: Tienda){
    return this.http.put<Tienda>(this.constPath + "api/Tiendas/actualizar", _tienda, this.headers);
  }

  eliminarTienda(_idTienda: number){
    return this.http.delete<Tienda>(this.constPath + "api/Tiendas/eliminar/?idtienda=" + _idTienda, this.headers);
  }

  getArticuloXTienda(_idTienda: number){
    return this.http.get(this.constPath + "api/Articulos/listaXtienda/?idtienda=" + _idTienda, this.headers);
  }

  guardaArticuloXTienda(tienda: TiendaDTO){
    return this.http.post(this.constPath + "api/Articulos/guardarXTienda",tienda, this.headers);
  }

  guardaArticuloXCliente(cliente: ClienteDTO){
    return this.http.post(this.constPath + "api/Clientes/guardarArticulos",cliente, this.headers);
  }

}
