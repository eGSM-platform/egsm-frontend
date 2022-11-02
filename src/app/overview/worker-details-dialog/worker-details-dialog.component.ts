import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StorageServiceService } from 'src/app/storage-service.service';
import { SupervisorService } from 'src/app/supervisor.service';

const MODULE_STORAGE_KEY = 'worker_detail'

@Component({
  selector: 'app-worker-details-dialog',
  templateUrl: './worker-details-dialog.component.html',
  styleUrls: ['./worker-details-dialog.component.scss']
})

export class WorkerDetailsDialogComponent implements AfterViewInit {
  ENGINE_ELEMENT_DATA: EngineElement[] = []
  eventSubscription: any
  isLoading = true


  displayedColumns: string[] = ['index', 'type', 'perspective', 'name', 'time', 'status', 'button'];
  dataSource = new MatTableDataSource<EngineElement>(this.ENGINE_ELEMENT_DATA);

  constructor(private router: Router, public dialogRef: MatDialogRef<WorkerDetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private supervisorService: SupervisorService, private storageService: StorageServiceService,) {
    this.eventSubscription = this.supervisorService.WorkerDialogEventEmitter.subscribe((update: any) => {
      this.applyUpdate(update)
    })
    var payload = {"worker_name":data.name}
    this.supervisorService.requestUpdate(MODULE_STORAGE_KEY, payload)
  }

  @ViewChild(MatPaginator) enginePaginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.enginePaginator;
  }

  applyUpdate(update: any) {
    console.log('WORKER DETAIL UOPDATE RECEIVED: ')
    console.log(update)
    this.isLoading = false

    this.dataSource.data = update['engines']

  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  navigateToEngine(name:any):void{
    this.router.navigate(['/engines']);
    this.dialogRef.close();
  }
}

export interface DialogData {
  name: string;
}

export interface EngineElement {
  index: Number,
  name: string;
  type: string,
  perspective: string,
  uptime: string,
  status: string
}