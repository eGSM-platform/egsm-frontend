import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingService } from '../loading.service';
import { NewProcessInstanceDialogComponent } from './new-process-instance-dialog/new-process-instance-dialog.component';
import { StorageServiceService } from '../storage-service.service';
import { SupervisorService } from '../supervisor.service';
import { Process } from '../primitives/primitives';

const MODULE_STORAGE_KEY = 'process_library'

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})

export class LibraryComponent implements AfterViewInit {
  displayedColumns: string[] = ['type', 'description', 'button'];
  dataSource = new MatTableDataSource<Process>([]);
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
      this.storageService.addValue(MODULE_STORAGE_KEY, this.supervisorService.LibraryEventEmitter)
      this.eventSubscription = this.storageService.getSubject(MODULE_STORAGE_KEY).subscribe((update: any) => {
        this.applyUpdate(update)
      })
      this.supervisorService.requestUpdate(MODULE_STORAGE_KEY)
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe()
  }

  applyUpdate(update: any) {
    this.dataSource.data = update['process_types']
    this.loadingService.setLoadningState(false)
  }

  openNewProcessInstanceDialog(process_type_name: string) {
    const dialogRef = this.dialog.open(NewProcessInstanceDialogComponent, {
      width: '1000px',
      data: {
        process_type_name: process_type_name,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}