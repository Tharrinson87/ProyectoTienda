import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosTiendaComponent } from './articulos-tienda.component';

describe('ArticulosTiendaComponent', () => {
  let component: ArticulosTiendaComponent;
  let fixture: ComponentFixture<ArticulosTiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticulosTiendaComponent]
    });
    fixture = TestBed.createComponent(ArticulosTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
