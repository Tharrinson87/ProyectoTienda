import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente, ClienteDTO } from 'src/app/modelo';
import { ServiciosService } from 'src/app/servicios.service';

@Component({
  selector: 'dialog-manto-cliente',
  templateUrl: './manto-cliente.component.html',
  styleUrls: ['./manto-cliente.component.css']
})
export class DialogMantoClienteComponent {
  _clienteForm: FormGroup; 

    private _snackBar = inject(MatSnackBar);

  constructor(@Inject(MAT_DIALOG_DATA) public data: Cliente,
    public dialogRef: MatDialogRef<DialogMantoClienteComponent>,
    public _servicio: ServiciosService, private fb: FormBuilder) {
     this._clienteForm = this.fb.group({
        IdCliente:[0, Validators.required],
        Nombre: ['', [Validators.required, Validators.minLength(2)]],
        Apellidos: ['', Validators.required],
        Direccion: ['', Validators.required],
        Clave: ['']
      });
    
      if(data.IdCliente != 0){
        this._clienteForm.get("Nombre")?.setValue(data.Nombre);
        this._clienteForm.get("Apellidos")?.setValue(data.Apellidos);
        this._clienteForm.get("Direccion")?.setValue(data.Direccion);
      }
  }

  btnGuardar(){
    var _cliente: ClienteDTO = { 
        IdCliente: (this.data.IdCliente > 0)? this.data.IdCliente:0,
        Nombre:  this._clienteForm.get("Nombre")?.value, 
        Apellidos:  this._clienteForm.get("Apellidos")?.value, 
        Direccion:  this._clienteForm.get("Direccion")?.value, 
        Clave: this._clienteForm.get("Clave")?.value,
        Articulos: []
      };
      if(this.data.IdCliente > 0){
        this._servicio.actualizaCliente(_cliente).subscribe((data) => {
          this.dialogRef.close();
          this.openSnackBar("Cliente actualizado!","Aceptar");
        });
      }else{
        this._servicio.creaCliente(_cliente).subscribe((data) => {
          this.dialogRef.close();
          this.openSnackBar("Cliente creado!","Aceptar");
        });
      }
  }

  btnCancelar(){
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
