import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleNotaVentaComponent } from './detalle-nota-venta.component';

describe('DetalleNotaVentaComponent', () => {
  let component: DetalleNotaVentaComponent;
  let fixture: ComponentFixture<DetalleNotaVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleNotaVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleNotaVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
