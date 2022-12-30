import { LocalizedString } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingService } from '../loading.service';
import { Aggregator, EGSMWorker } from '../primitives/primitives';
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
  WORKER_ELEMENT_DATA: EGSMWorker[] = []
  AGGREGATOR_ELEMENT_DATA: Aggregator[] = []

  engineDisplayedColumns: string[] = ['index', 'name', 'engines', 'capacity', 'time', 'hostname', 'port', 'button'];
  aggregatorDisplayedColumns: string[] = ['index', 'name', 'activity_mumber', 'capacity', 'time', 'hostname', 'port'];
  enginedataSource = new MatTableDataSource<EGSMWorker>(this.WORKER_ELEMENT_DATA);
  aggregatordataSource = new MatTableDataSource<Aggregator>(this.AGGREGATOR_ELEMENT_DATA);

  eventSubscription: any

  constructor(public dialog: MatDialog, private supervisorService: SupervisorService, private storageService: StorageServiceService, private loadingService: LoadingService) {
    if (this.storageService.hasKey(MODULE_STORAGE_KEY)) {
      this.eventSubscription = this.storageService.getSubject(MODULE_STORAGE_KEY).subscribe((update: any) => {
        this.applyUpdate(update)
      })
      this.storageService.triggerUpdate(MODULE_STORAGE_KEY)
    }
    else {
      loadingService.setLoadningState(true)
      this.storageService.addValue(MODULE_STORAGE_KEY, this.supervisorService.OverviewEventEmitter)
      this.WORKER_ELEMENT_DATA = []
      this.eventSubscription = this.storageService.getSubject(MODULE_STORAGE_KEY).subscribe((update: any) => {
        this.applyUpdate(update)
      })
      this.supervisorService.requestUpdate(MODULE_STORAGE_KEY)
    }
  }

  @ViewChild(MatPaginator) enginePaginator: MatPaginator;

  ngAfterViewInit() {
    this.enginedataSource.paginator = this.enginePaginator;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe()
  }

  /**
   * Opens a WorkerDetailsDialogComponent to show details of a specified Worker
   * @param name Name of the Worker
   */
  openDialog(name: LocalizedString) {
    console.log("navigate: " + name)
    this.dialog.open(WorkerDetailsDialogComponent, {
      width: '1300px',
      data: {
        name: name,
      }
    });
  }

  applyUpdate(update: any) {
    this.WORKER_ELEMENT_DATA = update['workers']
    this.enginedataSource.data = this.WORKER_ELEMENT_DATA
    this.aggregatordataSource.data = update['aggregators'];
    this.loadingService.setLoadningState(false)
  }
}