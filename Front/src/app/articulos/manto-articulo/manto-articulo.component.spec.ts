import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMantoArticuloComponent } from './manto-articulo.component';

describe('MantoArticuloComponent', () => {
  let component: DialogMantoArticuloComponent;
  let fixture: ComponentFixture<DialogMantoArticuloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogMantoArticuloComponent]
    });
    fixture = TestBed.createComponent(DialogMantoArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
