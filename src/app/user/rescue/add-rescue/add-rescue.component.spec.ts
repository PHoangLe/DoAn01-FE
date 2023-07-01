import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRescueComponent } from './add-rescue.component';

describe('AddRescueComponent', () => {
  let component: AddRescueComponent;
  let fixture: ComponentFixture<AddRescueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRescueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRescueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
