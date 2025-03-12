import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { TiendasComponent } from './tiendas/tiendas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { AdministracionComponent } from './administracion/administracion.component';
import { CarritoComponent } from './carrito/carrito.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule} from '@angular/material/list';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogMantoClienteComponent } from './clientes/manto-cliente/manto-cliente.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthInterceptor } from './AuthInterceptors';
import { DialogMantoTiendaComponent } from './tiendas/manto-tienda/manto-tienda.component';
import { DialogMantoArticuloComponent } from './articulos/manto-articulo/manto-articulo.component';
import { ArticulosTiendaComponent } from './articulos-tienda/articulos-tienda.component';
import { DialogoConfirmacionComponent } from './utils/dialog-confirm';

@NgModule({
  declarations: [
    AppComponent,
    TiendasComponent,
    ClientesComponent,
    ArticulosComponent,
    AdministracionComponent,
    CarritoComponent,
    LoginComponent,
    DialogMantoClienteComponent,
    DialogMantoTiendaComponent,
    DialogMantoArticuloComponent,
    ArticulosTiendaComponent,
    DialogoConfirmacionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatGridListModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
