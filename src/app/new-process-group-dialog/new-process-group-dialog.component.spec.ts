import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProcessGroupDialogComponent } from './new-process-group-dialog.component';

describe('NewProcessGroupDialogComponent', () => {
  let component: NewProcessGroupDialogComponent;
  let fixture: ComponentFixture<NewProcessGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProcessGroupDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProcessGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
