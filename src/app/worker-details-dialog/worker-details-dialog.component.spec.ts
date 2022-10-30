import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerDetailsDialogComponent } from './worker-details-dialog.component';

describe('WorkerDetailsDialogComponent', () => {
  let component: WorkerDetailsDialogComponent;
  let fixture: ComponentFixture<WorkerDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
