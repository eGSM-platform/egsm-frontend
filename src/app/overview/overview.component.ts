import { LocalizedString } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SupervisorService } from '../supervisor.service';
import { WorkerDetailsDialogComponent } from './worker-details-dialog/worker-details-dialog.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, AfterViewInit {
  ENGINE_ELEMENT_DATA: WorkerElement[] = []


  engineDisplayedColumns: string[] = ['index', 'name', 'engines', 'capacity', 'time', 'button'];
  aggregatorDisplayedColumns: string[] = ['index', 'name', 'activities', 'time'];
  enginedataSource = new MatTableDataSource<WorkerElement>(this.ENGINE_ELEMENT_DATA);
  aggregatordataSource = new MatTableDataSource<AggregatorElement>(AGGREGATOR_ELEMENT_DATA);
  eventSubscription: any

  constructor(public dialog: MatDialog, private supervisorService: SupervisorService) {

  }

  @ViewChild(MatPaginator) enginePaginator: MatPaginator;
  //@ViewChild(MatPaginator) aggregatorPaginator: MatPaginator;

  ngAfterViewInit() {
    this.enginedataSource.paginator = this.enginePaginator;
    //this.aggregatordataSource.paginator = this.aggregatorPaginator;
  }

  ngOnInit() {
    this.eventSubscription = this.supervisorService.OverviewEventEmitter.subscribe((update: any) => {
      console.log('Overview update received')
      this.applyUpdate(update)
    })
    //this.supervisorService.requestUpdate('overview')
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

  }
}

export interface WorkerElement {
  index: number;
  name: string;
  capacity: number;
  engine_mumber: number;
  uptime: string;
}

export interface AggregatorElement {
  index: number;
  name: string;
  activity_mumber: number;
  uptime: string;
}

/*const ENGINE_ELEMENT_DATA: WorkerElement[] = [
  { index: 1, name: 'Worker_1', engine_mumber: 7, capacity: 50, uptime: "00:00" },
  { index: 2, name: 'Worker_2', engine_mumber: 1, capacity: 50, uptime: "00:00" },
  { index: 3, name: 'Worker_3', engine_mumber: 0, capacity: 50, uptime: "00:00" },
  { index: 4, name: 'Worker_4', engine_mumber: 11, capacity: 50, uptime: "00:00" },
  { index: 1, name: 'Worker_1', engine_mumber: 7, capacity: 50, uptime: "00:00" },
  { index: 2, name: 'Worker_2', engine_mumber: 1, capacity: 50, uptime: "00:00" },
  { index: 3, name: 'Worker_3', engine_mumber: 0, capacity: 50, uptime: "00:00" },
  { index: 4, name: 'Worker_4', engine_mumber: 11, capacity: 50, uptime: "00:00" },
];*/

const AGGREGATOR_ELEMENT_DATA: AggregatorElement[] = [
  { index: 1, name: 'Aggregator_1', activity_mumber: 11, uptime: '00:00' },
  { index: 2, name: 'Aggregator_2', activity_mumber: 11, uptime: '00:00' },
  { index: 3, name: 'Aggregator_3', activity_mumber: 21, uptime: '00:00' },
  { index: 4, name: 'Aggregator_4', activity_mumber: 31, uptime: '00:00' },
  { index: 5, name: 'Aggregator_5', activity_mumber: 15, uptime: '00:00' },
];