import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteProcessDialogComponent } from '../delete-process-dialog/delete-process-dialog.component';
import { EngineListComponent } from '../engine-list/engine-list.component';
import { LoadingService } from '../loading.service';
import { SupervisorService } from '../supervisor.service';

const MODULE_STORAGE_KEY = 'process_operation'

@Component({
  selector: 'app-engines',
  templateUrl: './engines.component.html',
  styleUrls: ['./engines.component.scss']
})
export class EnginesComponent {
  eventSubscription: any
  currentProcessId: string = ""
  isResult: boolean = false

  @ViewChild('engines') engineList: EngineListComponent

  constructor(private supervisorService: SupervisorService, private snackBar: MatSnackBar, private loadingService: LoadingService, public deleteProcessDialog: MatDialog) {
    this.eventSubscription = this.supervisorService.ProcessSearchEventEmitter.subscribe((update: any) => {
      this.applyUpdate(update)
    })
  }

  applyUpdate(update: any) {
    this.loadingService.setLoadningState(false)
    var engines = update['engines'] || undefined
    var deleteResult = update['delete_result'] || undefined
    if (engines != undefined && engines.length > 0) {
      this.engineList.update(update['engines'])
      this.isResult = true
    }
    else if (engines != undefined) {
      this.snackBar.open(`The requested Process Instance does not found!`, "Hide", { duration: 2000 });
      this.isResult = false
    }

    if (deleteResult) {
      if (deleteResult == "ok") {
        this.snackBar.open(`The process has been deleted`, "Hide", { duration: 2000 });
        this.isResult = false
      }
      else {
        this.snackBar.open(`Server error occurred while deleting the process`, "Hide", { duration: 2000 });
        this.isResult = false
      }
    }

  }

  onSearch(instance_id: any) {
    this.snackBar.dismiss()
    this.currentProcessId = instance_id
    this.requestEngineData()
  }

  onDeleteProcess() {
    const dialogRef = this.deleteProcessDialog.open(DeleteProcessDialogComponent,
      {
        width: '500px',
        data: {
          processId: this.currentProcessId,
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.requestProcessDelete()
      }
    })
  }

  requestProcessDelete() {
    this.loadingService.setLoadningState(true)
    var payload = {
      process_instance_id: this.currentProcessId
    }
    this.supervisorService.sendCommand(MODULE_STORAGE_KEY, payload)
  }

  requestEngineData() {
    this.loadingService.setLoadningState(true)
    var payload = {
      process_instance_id: this.currentProcessId
    }
    this.supervisorService.requestUpdate(MODULE_STORAGE_KEY, payload)
  }
}
