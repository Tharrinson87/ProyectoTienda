import { Component, Input } from '@angular/core';
import { DialogMantoArticuloComponent } from './manto-articulo/manto-articulo.component';
import { MatDialog } from '@angular/material/dialog';
import { ServiciosService } from '../servicios.service';
import { Articulo } from '../modelo';
import { DialogoConfirmacionComponent } from '../utils/dialog-confirm';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent {
  displayedColumns: string[] = ['Codigo', 'Descripcion', 'Precio', 'Stock', 'actualizar','eliminar'];
  @Input() dataArticulos: Articulo[] = [];

  constructor(public dialog: MatDialog, public _servicio: ServiciosService,public dialogo: MatDialog){
    
  }

  getArticulos(){
    this._servicio.getArticulos().subscribe((data: any) => {
      if(data.length > 0){
       this.dataArticulos = data;
      }
     });
  }

  openDialogNew(){
    var data: any = {
      codigo: '',
      descripcion: '',
      precio: 0,
      imagen:'',
      stock: 0
    };

    this.openDialog(data);
  }

  openDialog(articulo: any) {
      var dialogRef = this.dialog.open(DialogMantoArticuloComponent, {
        data: {
          Codigo: articulo.codigo,
          Descripcion: articulo.descripcion,
          Precio: articulo.precio,
          Imagen: articulo.imagen,
          Stock: articulo.stock
        },
      });

    dialogRef.afterClosed().subscribe(result => {
      this.getArticulos();
    });
  }

  eliminar(articulo: any){
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Desea eliminar el artículo: ` + articulo.codigo + `?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {          
          this._servicio.eliminarArticulo(articulo.codigo).subscribe((data: any) => {
            this.getArticulos();
          });
        }
      });
  }

}
