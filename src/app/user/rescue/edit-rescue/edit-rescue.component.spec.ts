import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRescueComponent } from './edit-rescue.component';

describe('EditRescueComponent', () => {
  let component: EditRescueComponent;
  let fixture: ComponentFixture<EditRescueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRescueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRescueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
