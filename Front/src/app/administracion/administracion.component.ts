import { Component } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent {

  dataSource: any;
  title!: string;

  constructor (public _servicio: ServiciosService, private fb: FormBuilder,
      private router: Router
    ){
      this.getClientes();
    }

    getClientes(){
      this.title = "CLIENTES";
      this.dataSource = null;
      this._servicio.getClientes().subscribe((data: any) => {
       if(data.length > 0){
        this.dataSource = data;
       }
      });
    }

    getArticulos(){
      this.title = "ARTICULOS";
      this.dataSource = null;
      this._servicio.getArticulos().subscribe((data: any) => {
        if(data.length > 0){
         this.dataSource = data;
        }
       });
    }

    getTiendas(){
      this.title = "TIENDAS";
      this.dataSource = [];
      this._servicio.getTiendas().subscribe((data: any) => {
        if(data.length > 0){
         this.dataSource = data;
        }
       });
    }

    articulosTienda(){
      this.title = "ARTICULOS-TIENDA";
    }
}
