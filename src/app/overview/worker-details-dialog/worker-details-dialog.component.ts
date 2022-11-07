import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EngineListComponent } from 'src/app/engine-list/engine-list.component';
import { SupervisorService } from 'src/app/supervisor.service';

const MODULE_STORAGE_KEY = 'worker_detail'

@Component({
  selector: 'app-worker-details-dialog',
  templateUrl: './worker-details-dialog.component.html',
  styleUrls: ['./worker-details-dialog.component.scss']
})

export class WorkerDetailsDialogComponent {
  eventSubscription: any

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<WorkerDetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: WorkerDetailDialogData,
    private supervisorService: SupervisorService) {
    this.eventSubscription = this.supervisorService.WorkerDialogEventEmitter.subscribe((update: any) => {
      this.applyUpdate(update)
    })
    var payload = { "worker_name": data.name }
    this.supervisorService.requestUpdate(MODULE_STORAGE_KEY, payload)
  }

  @ViewChild("engines") engineList: EngineListComponent;

  applyUpdate(update: any) {
    this.engineList.update(update['engines'])
  }
}

export interface WorkerDetailDialogData {
  name: string;
}