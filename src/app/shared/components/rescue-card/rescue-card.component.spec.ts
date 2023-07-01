import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescueCardComponent } from './rescue-card.component';

describe('RescueCardComponent', () => {
  let component: RescueCardComponent;
  let fixture: ComponentFixture<RescueCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RescueCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RescueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
