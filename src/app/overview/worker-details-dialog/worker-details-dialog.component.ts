import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EngineDetailDialogComponent } from 'src/app/engine-detail-dialog/engine-detail-dialog.component';
import { EngineElement, EngineListComponent } from 'src/app/engine-list/engine-list.component';
import { StorageServiceService } from 'src/app/storage-service.service';
import { SupervisorService } from 'src/app/supervisor.service';

const MODULE_STORAGE_KEY = 'worker_detail'

@Component({
  selector: 'app-worker-details-dialog',
  templateUrl: './worker-details-dialog.component.html',
  styleUrls: ['./worker-details-dialog.component.scss']
})

export class WorkerDetailsDialogComponent implements AfterViewInit {
  eventSubscription: any

  constructor(public dialog: MatDialog, private router: Router, public dialogRef: MatDialogRef<WorkerDetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: WorkerDetailDialogData,
    private supervisorService: SupervisorService, private storageService: StorageServiceService,) {
    this.eventSubscription = this.supervisorService.WorkerDialogEventEmitter.subscribe((update: any) => {
      this.applyUpdate(update)
    })
    var payload = { "worker_name": data.name }
    this.supervisorService.requestUpdate(MODULE_STORAGE_KEY, payload)
  }
  ngAfterViewInit(): void {

  }

  @ViewChild("engines") engineList:EngineListComponent;
  //@ViewChild(MatPaginator) enginePaginator: MatPaginator;


  applyUpdate(update: any) {
    console.log('WORKER DETAIL UOPDATE RECEIVED: ')
    console.log(update)
    this.engineList.update(update['engines'])
  }
}

export interface WorkerDetailDialogData {
  name: string;
}