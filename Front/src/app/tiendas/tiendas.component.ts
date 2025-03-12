import { Component, Input } from '@angular/core';
import { Tienda } from '../modelo';
import { MatDialog } from '@angular/material/dialog';
import { ServiciosService } from '../servicios.service';
import { DialogMantoTiendaComponent } from './manto-tienda/manto-tienda.component';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent {
  displayedColumns: string[] = ['Sucursal', 'Direccion',  'actualizar','eliminar'];
  @Input() dataTiendas: Tienda[] = [];

  constructor(public dialog: MatDialog, public _servicio: ServiciosService){
    
  }

  getTiendas(){
    this._servicio.getTiendas().subscribe((data: any) => {
      if(data.length > 0){
       this.dataTiendas = data;
      }
     });
  }

  openDialogNew(){
    var data: any = {
      idTienda: 0,
      sucursal: '',
      direccion: ''
    };

    this.openDialog(data);
  }

  openDialog(tienda: any) {
      var dialogRef = this.dialog.open(DialogMantoTiendaComponent, {
        data: {
          IdTienda: tienda.idTienda,
          Sucursal: tienda.sucursal,
          Direccion: tienda.direccion
        },
      });

    dialogRef.afterClosed().subscribe(result => {
      this.getTiendas();
    });
  }

  eliminar(tienda: any){
    this._servicio.eliminarTienda(tienda.idTienda).subscribe((data: any) => {
      this.getTiendas();
     });
  }

}
