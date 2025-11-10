import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZkitComponent } from './zkit.component';

describe('ZkitComponent', () => {
  let component: ZkitComponent;
  let fixture: ComponentFixture<ZkitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZkitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
