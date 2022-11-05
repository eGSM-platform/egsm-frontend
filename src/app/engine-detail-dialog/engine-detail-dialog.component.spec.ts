import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineDetailDialogComponent } from './engine-detail-dialog.component';

describe('EngineDetailDialogComponent', () => {
  let component: EngineDetailDialogComponent;
  let fixture: ComponentFixture<EngineDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineDetailDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
