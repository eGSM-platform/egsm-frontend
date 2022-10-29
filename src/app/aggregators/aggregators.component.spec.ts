import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorsComponent } from './aggregators.component';

describe('AggregatorsComponent', () => {
  let component: AggregatorsComponent;
  let fixture: ComponentFixture<AggregatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggregatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
