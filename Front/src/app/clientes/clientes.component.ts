import { Component, Input } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { DialogMantoClienteComponent } from './manto-cliente/manto-cliente.component';
import { Cliente } from '../modelo';
import { ServiciosService } from '../servicios.service';
import { DialogoConfirmacionComponent } from '../utils/dialog-confirm';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  displayedColumns: string[] = ['Nombre', 'Apellidos', 'Direccion', 'actualizar','eliminar'];
  @Input() dataClientes: Cliente[] = [];

  constructor(public dialog: MatDialog, public _servicio: ServiciosService,public dialogo: MatDialog){
    
  }

  getClientes(){
    this._servicio.getClientes().subscribe((data: any) => {
      if(data.length > 0){
       this.dataClientes = data;
      }
     });
  }

  openDialogNew(){
    var data: any = {
      idCliente: 0,
      nombre: '',
      apellidos: '',
      direccion:'',
      clave: ''
    };

    this.openDialog(data);
  }

  openDialog(cliente: any) {
      var dialogRef = this.dialog.open(DialogMantoClienteComponent, {
        data: {
          IdCliente: cliente.idCliente,
          Nombre: cliente.nombre,
          Apellidos: cliente.apellidos,
          Direccion: cliente.direccion,
          Clave: cliente.clave
        },
      });

    dialogRef.afterClosed().subscribe(result => {
      this.getClientes();
    });
  }

  eliminar(cliente: any){
    this.dialogo
          .open(DialogoConfirmacionComponent, {
            data: `¿Desea eliminar el cliente: ` + cliente.nombre + `?`
          })
          .afterClosed()
          .subscribe((confirmado: Boolean) => {
            if (confirmado) {          
              this._servicio.eliminarCliente(cliente.idCliente).subscribe((data: any) => {
                this.getClientes();
               });
            }
          });
   
  }
}
