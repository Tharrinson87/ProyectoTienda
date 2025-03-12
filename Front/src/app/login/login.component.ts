import { Component } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Administrador, Cliente } from '../modelo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'FrontTienda';
  _loginForm: FormGroup; 

  isLogin = 0;
  constructor (public _servicio: ServiciosService, private fb: FormBuilder,
    private router: Router
  ){
    this._loginForm = this.fb.group({
      Usuario: ['', [Validators.required, Validators.minLength(2)]],
      Clave: ['', Validators.required]
    });
  }

  btnAdminCliCk(){
    this.isLogin = 1;
    this._loginForm.get("Usuario")?.setValue('admin');
    this._loginForm.get("Clave")?.setValue('123');
  }

  btnClienteClick(){
    this.isLogin = 2;
  }

  btnLogin(){
    if (this.isLogin == 1){
      var _admin: Administrador = { 
        Usuario: this._loginForm.get("Usuario")?.value, 
        Clave: this._loginForm.get("Clave")?.value
      };
      this._servicio.loginAdmin(_admin).subscribe((data) => {
        var datos = data;
        localStorage.setItem('auth_token', data.token);
        this.router.navigate(["/", "administracion"]);
      });
    }else{
      var _cliente: Cliente = { 
        IdCliente: 0,
        Nombre: this._loginForm.get("Usuario")?.value, 
        Apellidos: '',
        Direccion: '',
        Clave: this._loginForm.get("Clave")?.value
      };
      this._servicio.loginCliente(_cliente).subscribe((data) => {
        var datos = data;
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_auth', data.cliente);

        this.router.navigate(["/", "carrito"]);
      });
    }
  }
}
