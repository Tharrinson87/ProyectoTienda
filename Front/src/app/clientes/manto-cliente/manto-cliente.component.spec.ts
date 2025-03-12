import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMantoClienteComponent } from './manto-cliente.component';

describe('MantoClienteComponent', () => {
  let component: DialogMantoClienteComponent;
  let fixture: ComponentFixture<DialogMantoClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogMantoClienteComponent]
    });
    fixture = TestBed.createComponent(DialogMantoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
