import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesCountryComponent } from './cases-country.component';

describe('CasesCountryComponent', () => {
  let component: CasesCountryComponent;
  let fixture: ComponentFixture<CasesCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasesCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
