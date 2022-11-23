import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../../loading.service';
import { SupervisorService } from '../../supervisor.service';

const MODULE_STORAGE_KEY = 'new_process_instance'

@Component({
  selector: 'app-new-process-instance-dialog',
  templateUrl: './new-process-instance-dialog.component.html',
  styleUrls: ['./new-process-instance-dialog.component.scss']
})
export class NewProcessInstanceDialogComponent {
  eventSubscription: any
  constructor(public dialogRef: MatDialogRef<NewProcessInstanceDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: NewProcessInstanceDialogData,
    private loadingService: LoadingService, private snackBar: MatSnackBar, private supervisorService: SupervisorService) {
    this.eventSubscription = this.supervisorService.NewProcessInstaceEventEmitter.subscribe((update: any) => {
      this.applyUpdate(update)
    })
  }

  applyUpdate(update: any) {
    this.loadingService.setLoadningState(false)
    if (update['result'] == 'ok') {
      this.snackBar.open(`Process created successfully`, "Hide", { duration: 2000 });
      this.dialogRef.close()
    }
    else if (update['result'] == 'id_not_free') {
      this.snackBar.open(`A process instance with this ID is already exist! Creation could not be finished`, "Hide", { duration: 2000 });
    }
    else if (update['result'] == 'backend_error') {
      this.snackBar.open(`Backend error while creating the process instance. Probably not all required eGSM engine and/or BPMN model has been created!`, "Hide", { duration: 2000 });
    }
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe()
  }

  onCreate(instance_name: string) {
    this.snackBar.dismiss()
    this.loadingService.setLoadningState(true)
    if (instance_name.includes('__') || instance_name.includes('/') || instance_name.includes('#')) {
      this.snackBar.open(`Invalid id (Can't contain: "__", "/" or "#" )`, "Hide", { duration: 2000 });
      this.loadingService.setLoadningState(false)
    }
    else {
      var payload = {
        instance_name: instance_name,
        process_type: this.data.process_type_name
      }
      this.supervisorService.sendCommand(MODULE_STORAGE_KEY, payload)
    }
  }
}

export interface NewProcessInstanceDialogData {
  process_type_name: string
}