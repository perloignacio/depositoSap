import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanzaComponent } from './balanza.component';

describe('BalanzaComponent', () => {
  let component: BalanzaComponent;
  let fixture: ComponentFixture<BalanzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanzaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
