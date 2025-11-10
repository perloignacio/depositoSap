import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZkitArmadoComponent } from './zkit-armado.component';

describe('ZkitArmadoComponent', () => {
  let component: ZkitArmadoComponent;
  let fixture: ComponentFixture<ZkitArmadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZkitArmadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZkitArmadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
