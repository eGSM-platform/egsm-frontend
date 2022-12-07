import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingService } from '../loading.service';
import { NewProcessInstanceDialogComponent } from './new-process-instance-dialog/new-process-instance-dialog.component';
import { StorageServiceService } from '../storage-service.service';
import { SupervisorService } from '../supervisor.service';
import { Process, ProcessGroup } from '../primitives/primitives';
import { NewProcessGroupDialogComponent } from '../new-process-group-dialog/new-process-group-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  isProcessGroupDetailsFound = false
  processGroupDetails = {} as ProcessGroup

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private supervisorService: SupervisorService, private storageService: StorageServiceService, private loadingService: LoadingService) {
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
      var payload = {
        type: 'process_type_list'
      }
      this.supervisorService.requestUpdate(MODULE_STORAGE_KEY, payload)
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
    this.snackBar.dismiss()
    this.loadingService.setLoadningState(false)
    if (update['type'] == 'process_type_list') {
      this.dataSource.data = update['process_types']
    }
    else if (update['type'] == 'get_process_group') {
      if (update['result'] == 'found') {
        this.processGroupDetails = update['process_group'] as ProcessGroup
        this.isProcessGroupDetailsFound = true
      }
      else if (update['result'] == 'not_found') {
        this.isProcessGroupDetailsFound = false
        this.snackBar.open(`Process group does not found`, "Hide", { duration: 2000 });
      }
    }
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

  onDefineProcessGroup() {
    const dialogRef = this.dialog.open(NewProcessGroupDialogComponent, {
      width: '650px',
      data: {

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onProcessGroupSearch(groupName: string) {
    this.snackBar.dismiss()
    if(groupName.length == 0){
      this.snackBar.open(`Please provide all necessary arguments!`, "Hide", { duration: 2000 });
      return
    }
    var payload = {
      type: 'get_process_group',
      process_goup_id: groupName
    }
    this.supervisorService.requestUpdate(MODULE_STORAGE_KEY, payload)
  }
}