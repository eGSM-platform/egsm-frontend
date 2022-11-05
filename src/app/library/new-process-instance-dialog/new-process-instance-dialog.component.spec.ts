import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProcessInstanceDialogComponent } from './new-process-instance-dialog.component';

describe('NewProcessInstanceDialogComponent', () => {
  let component: NewProcessInstanceDialogComponent;
  let fixture: ComponentFixture<NewProcessInstanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProcessInstanceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProcessInstanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
