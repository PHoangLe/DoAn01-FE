import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescueCardShelterComponent } from './rescue-card-shelter.component';

describe('RescueCardShelterComponent', () => {
  let component: RescueCardShelterComponent;
  let fixture: ComponentFixture<RescueCardShelterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RescueCardShelterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RescueCardShelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
