import { Component, ViewChild } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { ArticuloDTO, Cliente, ClienteDTO } from '../modelo';
import { MatTable } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

    dataArticulos: any[] = [];
    dataArticulosCarrito: ArticuloDTO[] = [];

    @ViewChild(MatTable) table!: MatTable<ArticuloDTO>;
    enCarrito = false;
    displayedColumns: string[] = ['Codigo', 'Descripcion', 'Cantidad',  'actualizar','eliminar'];

    constructor(public _servicio: ServiciosService, private _sanitizer: DomSanitizer){
      this.getArticulos();
    }

    getArticulos(){
      var dataArticulos2: any[] = [];
      this._servicio.getArticulos().subscribe((data: any) => {
        if(data.length > 0){
         dataArticulos2 = data;
         dataArticulos2.forEach(e=>{
          var art: ArticuloDTO={
            Codigo: e.codigo,
            Descripcion: e.descripcion,
            Precio: e.precio,
            strImagen: '',
            Imagen: this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'  + e.imagen),
            Stock: e.stock, 
            Cantidad: 0
          };
          this.dataArticulos.push(art);
         });
        }
       });
    }

    agregarCarrito(item: any){
      if(item.Cantidad>0){
        if (this.dataArticulosCarrito.filter(i=> i.Codigo == item.Codigo).length == 0){
          var art: ArticuloDTO = {
            Codigo: item.Codigo,
            Descripcion: item.Descripcion,
            Precio: item.Precio,
            Imagen: item.Imagen,
            strImagen: '',
            Stock: item.Stock, 
            Cantidad: item.Cantidad
          };
          this.dataArticulosCarrito.push(art);
        }else{
          this.dataArticulosCarrito.filter((it, idx) => {
            if(it.Codigo == item.Codigo){
              it.Cantidad = item.Cantidad;
              return;
            }
          })
        }          
      }else{
        this.dataArticulosCarrito.filter((it, idx) => {
          if(it.Codigo == item.Codigo){
            this.dataArticulosCarrito.splice(idx, 1);
            return;
          }
        })
      }

      this.dataArticulos.filter((it, idx) => {
        if(it.Codigo == item.Codigo){
          it.Cantidad = item.Cantidad;
          return;
        }
      });
    }

    irCarrito(ir: boolean){
      this.enCarrito = ir;
    }

    eliminar(item: any){
      this.dataArticulosCarrito.forEach((it, idx) => {
        if(it.Codigo == item.Codigo){
          this.dataArticulosCarrito.splice(idx, 1);
          this.table.renderRows();
          return;
        }
      });

      this.dataArticulos.filter((it, idx) => {
        if(it.Codigo == item.Codigo){
          it.Cantidad = 0;
          return;
        }
      });
    }    

    guardarCarrito(){
      var user: Cliente = JSON.parse(localStorage.getItem('user_auth')!);
      var cliente: ClienteDTO = {
        IdCliente: user.IdCliente,
        Nombre: user.Nombre,
        Apellidos: user.Apellidos,
        Direccion: user.Direccion,
        Clave: '',
        Articulos: this.dataArticulosCarrito
      };
      this._servicio.guardaArticuloXCliente(cliente).subscribe((data: any) => {
          this.enCarrito = false;
          this.dataArticulosCarrito = [];

          this.dataArticulos.map((it) => {
              it.Cantidad = 0;
          });
       });
    }
    
}

