import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMantoTiendaComponent } from './manto-tienda.component';

describe('MantoTiendaComponent', () => {
  let component: DialogMantoTiendaComponent;
  let fixture: ComponentFixture<DialogMantoTiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogMantoTiendaComponent]
    });
    fixture = TestBed.createComponent(DialogMantoTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
