import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterPageComponent } from './shelter-page.component';

describe('ShelterPageComponent', () => {
  let component: ShelterPageComponent;
  let fixture: ComponentFixture<ShelterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShelterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
