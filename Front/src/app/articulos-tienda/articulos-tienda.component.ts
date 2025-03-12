import { Component, Input, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { Articulo, Tienda } from '../modelo';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-articulos-tienda',
  templateUrl: './articulos-tienda.component.html',
  styleUrls: ['./articulos-tienda.component.css']
})
export class ArticulosTiendaComponent implements OnInit  {

  selectTienda = new FormControl<string | any>('');
  dataArticulos: any[] =[];
  @Input() dataArticulosSelected: any[] = [];
  dataTiendas: any[] = [];
  filteredOptions!: Observable<any[]>;
  selectedTienda: any;

  constructor(public _servicio: ServiciosService){
    
  }

  ngOnInit() {
    this.getTiendas();
    
  }

  private _filter(name: string): Tienda[] {
    const filterValue = name.toLowerCase();

    return this.dataTiendas.filter(option => option.sucursal.toLowerCase().includes(filterValue));
  }

  getTiendas(){
    this._servicio.getTiendas().subscribe((data: any) => {
      if(data.length > 0){
       this.dataTiendas = data;
      }
      this.filteredOptions = this.selectTienda.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.Sucursal;
          return name ? this._filter(name as string) : this.dataTiendas.slice();
        }),
      );
     });
  }

  getArticulos(){
    this._servicio.getArticulos().subscribe((data: any) => {
      this.dataArticulos = [];
      if(data.length > 0){
      var nuevos: any[] = data;
       nuevos.forEach(it => { 
        if(this.dataArticulosSelected.filter(i => i.codigo == it.codigo).length == 0){
          this.dataArticulos.push(it);
        }});
      }
     });
  }

  getArticulosXTienda(_idTienda: number){
    this.dataArticulosSelected = [];
    this._servicio.getArticuloXTienda(_idTienda).subscribe((data: any) => {
      if(data.length > 0){
       this.dataArticulosSelected = data;
      }
      this.getArticulos();
     });
  }

  selectedItemTienda(item: any){
    this.selectedTienda = item;
    this.dataArticulos = [];
    this.dataArticulosSelected = [];
    this.getArticulosXTienda(item.idTienda);    
  }

  selectedItemArt(item: any){
    var index = -1;    
    this.dataArticulosSelected.push(item);
    this.dataArticulos.forEach((it,idx) => { 
      if(it.codigo == item.codigo){
        index = idx;
        this.dataArticulos.splice(index, 1);
      } 
    });
    
  }

  deselectedItemArt(item: any){
    var index = -1;    
    this.dataArticulos.push(item);
    this.dataArticulosSelected.forEach((it,idx) => { 
      if(it.codigo == item.codigo){
        index = idx;
        this.dataArticulosSelected.splice(index, 1);
      } 
    });
  }

  guardarArticulos(){
    this.selectedTienda.Articulos = this.dataArticulosSelected;
    this._servicio.guardaArticuloXTienda(this.selectedTienda).subscribe((data: any) => {

    });
  }
}
