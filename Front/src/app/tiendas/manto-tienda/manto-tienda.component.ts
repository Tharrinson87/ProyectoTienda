import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente, Tienda } from 'src/app/modelo';
import { ServiciosService } from 'src/app/servicios.service';

@Component({
  selector: 'app-manto-tienda',
  templateUrl: './manto-tienda.component.html',
  styleUrls: ['./manto-tienda.component.css']
})
export class DialogMantoTiendaComponent {
  _tiendaForm: FormGroup; 
   private _snackBar = inject(MatSnackBar);

  constructor(@Inject(MAT_DIALOG_DATA) public data: Tienda,
    public dialogRef: MatDialogRef<DialogMantoTiendaComponent>,
    public _servicio: ServiciosService, private fb: FormBuilder) {
     this._tiendaForm = this.fb.group({
      IdTienda:[0, Validators.required],
      Sucursal: ['', [Validators.required, Validators.minLength(2)]],
      Direccion: ['', Validators.required]
      });
    
      if(data.IdTienda != 0){
        this._tiendaForm.get("Sucursal")?.setValue(data.Sucursal);
        this._tiendaForm.get("Direccion")?.setValue(data.Direccion);
      }
  }

  btnGuardar(){
    var _tienda: Tienda = { 
      IdTienda: (this.data.IdTienda > 0)? this.data.IdTienda:0,
      Sucursal:  this._tiendaForm.get("Sucursal")?.value,  
        Direccion:  this._tiendaForm.get("Direccion")?.value
      };
      if(this.data.IdTienda > 0){
        this._servicio.actualizaTienda(_tienda).subscribe((data) => {
          this.dialogRef.close();          
          this.openSnackBar("Tienda actualizada!","Aceptar");
        });
      }else{
        this._servicio.creaTienda(_tienda).subscribe((data) => {
          this.dialogRef.close();
          this.openSnackBar("Tienda creada!","Aceptar");
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
