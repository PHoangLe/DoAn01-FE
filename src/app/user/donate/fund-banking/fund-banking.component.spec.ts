import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundBankingComponent } from './fund-banking.component';

describe('FundBankingComponent', () => {
  let component: FundBankingComponent;
  let fixture: ComponentFixture<FundBankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundBankingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
