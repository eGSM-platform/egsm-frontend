import { LocalizedString } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingService } from '../loading.service';
import { StorageServiceService } from '../storage-service.service';
import { SupervisorService } from '../supervisor.service';
import { WorkerDetailsDialogComponent } from './worker-details-dialog/worker-details-dialog.component';

const MODULE_STORAGE_KEY = 'overview'

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, AfterViewInit {
  WORKER_ELEMENT_DATA: WorkerElement[] = []
  AGGREGATOR_ELEMENT_DATA: AggregatorElement[] = []

  engineDisplayedColumns: string[] = ['index', 'name', 'engines', 'capacity', 'time', 'hostname', 'port', 'button'];
  aggregatorDisplayedColumns: string[] = ['index', 'name', 'activities', 'time', 'hostname', 'port'];
  enginedataSource = new MatTableDataSource<WorkerElement>(this.WORKER_ELEMENT_DATA);
  aggregatordataSource = new MatTableDataSource<AggregatorElement>(this.AGGREGATOR_ELEMENT_DATA);

  eventSubscription: any

  constructor(public dialog: MatDialog, private supervisorService: SupervisorService, private storageService: StorageServiceService, private loadingService: LoadingService) {
    if (this.storageService.hasKey(MODULE_STORAGE_KEY)) {
      this.eventSubscription = this.storageService.getSubject(MODULE_STORAGE_KEY).subscribe((update: any) => {
        console.log('Overview update received')
        this.applyUpdate(update)
      })
      this.storageService.triggerUpdate(MODULE_STORAGE_KEY)
    }
    else {
      loadingService.setLoadningState(true)
      this.storageService.addValue(MODULE_STORAGE_KEY, this.supervisorService.OverviewEventEmitter)
      this.WORKER_ELEMENT_DATA = []
      this.eventSubscription = this.storageService.getSubject(MODULE_STORAGE_KEY).subscribe((update: any) => {
        console.log('Overview update received')
        this.applyUpdate(update)
      })
      this.supervisorService.requestUpdate(MODULE_STORAGE_KEY)
    }
  }

  @ViewChild(MatPaginator) enginePaginator: MatPaginator;
  //@ViewChild(MatPaginator) aggregatorPaginator: MatPaginator;

  ngAfterViewInit() {
    this.enginedataSource.paginator = this.enginePaginator;
    //this.aggregatordataSource.paginator = this.aggregatorPaginator;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe()
  }

  openDialog(name: LocalizedString) {
    console.log("navigate: " + name)

    const dialogRef = this.dialog.open(WorkerDetailsDialogComponent, {
      width: '850px',
      data: {
        name: name,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  applyUpdate(update: any) {
    console.log('aggregators update:' + update)
    console.log(update['aggregators'])
    this.WORKER_ELEMENT_DATA = update['workers']
    this.enginedataSource.data = this.WORKER_ELEMENT_DATA
    //this.enginedataSource = new MatTableDataSource<WorkerElement>(this.WORKER_ELEMENT_DATA);
    //this.enginedataSource.paginator = this.enginePaginator;
    
    this.AGGREGATOR_ELEMENT_DATA = [
      { index: 1, name: 'Aggregator_1', activity_mumber: 11, uptime: '00:00', hostname: "localhost",port:8088 },
      { index: 2, name: 'Aggregator_2', activity_mumber: 11, uptime: '00:00' , hostname: "localhost",port:8088},
      { index: 3, name: 'Aggregator_3', activity_mumber: 21, uptime: '00:00' , hostname: "localhost",port:8088},
      { index: 4, name: 'Aggregator_4', activity_mumber: 31, uptime: '00:00' , hostname: "localhost",port:8088},
      { index: 5, name: 'Aggregator_5', activity_mumber: 15, uptime: '00:00' , hostname: "localhost",port:8088},
    ]
    
    //update['aggregators']
    this.aggregatordataSource = new MatTableDataSource<AggregatorElement>(this.AGGREGATOR_ELEMENT_DATA);
    
    this.loadingService.setLoadningState(false)
  }
}

export interface WorkerElement {
  index: number;
  name: string;
  capacity: number;
  engine_mumber: number;
  uptime: string;
  hostname: string;
  port: number;
}

export interface AggregatorElement {
  index: number;
  name: string;
  activity_mumber: number;
  uptime: string;
  hostname: string,
  port: number
}