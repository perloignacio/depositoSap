import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcialesComponent } from './parciales.component';

describe('ParcialesComponent', () => {
  let component: ParcialesComponent;
  let fixture: ComponentFixture<ParcialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
