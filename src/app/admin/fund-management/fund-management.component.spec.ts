import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundManagementComponent } from './fund-management.component';

describe('FundManagementComponent', () => {
  let component: FundManagementComponent;
  let fixture: ComponentFixture<FundManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
