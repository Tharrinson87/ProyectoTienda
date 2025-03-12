import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Articulo, ArticuloDTO } from 'src/app/modelo';
import { ServiciosService } from 'src/app/servicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manto-articulo',
  templateUrl: './manto-articulo.component.html',
  styleUrls: ['./manto-articulo.component.css']
})
export class DialogMantoArticuloComponent {
  _articuloForm: FormGroup; 
  srcImagen: any;
  
  private _snackBar = inject(MatSnackBar);

  constructor(@Inject(MAT_DIALOG_DATA) public data: Articulo,
    public dialogRef: MatDialogRef<DialogMantoArticuloComponent>,
    public _servicio: ServiciosService, private fb: FormBuilder) {
     this._articuloForm = this.fb.group({
      Codigo:['', Validators.required],
      Descripcion: ['', [Validators.required, Validators.minLength(2)]],
      Precio: [0, Validators.required],
      Imagen: ['', Validators.required],
      Stock: [0, Validators.required]
      });
    
      if(data.Codigo.length > 0){
        this._articuloForm.get("Codigo")?.setValue(data.Codigo);
        this._articuloForm.get("Descripcion")?.setValue(data.Descripcion);
        this._articuloForm.get("Precio")?.setValue(data.Precio);
        this._articuloForm.get("Imagen")?.setValue(data.Imagen);
        this._articuloForm.get("Stock")?.setValue(data.Stock);
      }
  }

  btnGuardar(){
    if(this.srcImagen == undefined){
      this.openSnackBar("Debe seleccionar una imagen para continuar","Aceptar");
      return;
    }
    var _articulo: ArticuloDTO = { 
        Codigo: (this.data.Codigo.length > 0)? this.data.Codigo: this._articuloForm.get("Codigo")?.value,
        Descripcion:  this._articuloForm.get("Descripcion")?.value, 
        Precio:  this._articuloForm.get("Precio")?.value,
        Imagen: '',
        strImagen: JSON.stringify(this.srcImagen), 
        Stock: this._articuloForm.get("Stock")?.value,
        Cantidad: 0
      };
      if(this.data.Codigo.length > 0){
        this._servicio.actualizaArticulo( _articulo).subscribe((data) => {
          this.dialogRef.close();
          this.openSnackBar("Artículo actualizado!","Aceptar");
        });
      }else{
        this._servicio.creaArticulo(_articulo).subscribe((data) => {
          this.dialogRef.close();
          this.openSnackBar("Artículo creado!","Aceptar");
        });
      }
  }

  onFileSelected(event: any){
    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.srcImagen = event.target.result;
    };

    reader.onerror = (event: any) => {
      console.log("Error: " + event.target.error.code);
    };
    
    reader.readAsDataURL(event.target.files[0]);

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  btnCancelar(){
    this.dialogRef.close();
  }
}
