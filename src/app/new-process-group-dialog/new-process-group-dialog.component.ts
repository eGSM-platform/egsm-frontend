import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../loading.service';
import { SupervisorService } from '../supervisor.service';

const MODULE_STORAGE_KEY = 'new_process_group'

@Component({
  selector: 'app-new-process-group-dialog',
  templateUrl: './new-process-group-dialog.component.html',
  styleUrls: ['./new-process-group-dialog.component.scss']
})
export class NewProcessGroupDialogComponent implements OnInit {
  eventSubscription: any

  constructor(public dialogRef: MatDialogRef<NewProcessGroupDialogComponent>, private loadingService: LoadingService, private snackBar: MatSnackBar, private supervisorService: SupervisorService) {
    this.eventSubscription = this.supervisorService.NewProcessGroupEventEmitter.subscribe((update: any) => {
      this.applyUpdate(update)
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe()
  }

  applyUpdate(update: any) {
    this.loadingService.setLoadningState(false)
    if (update['type'] == 'create') {
      if (update['result'] == 'created') {
        this.snackBar.open(`Process Group created successfully`, "Hide", { duration: 2000 });
        this.dialogRef.close()
      }
      else if (update['result'] == 'already_exists') {
        this.snackBar.open(`A Process Group with this ID is already exist! Creation could not be finished`, "Hide", { duration: 2000 });
      }
      else if (update['result'] == 'backend_error') {
        this.snackBar.open(`Backend error while creating the Process Group!`, "Hide", { duration: 2000 });
      }
    }
  }

  onCreate(groupId: string, ruleExpression: string) {
    this.snackBar.dismiss()
    try {
      var ruleExpressionObj = JSON.parse(ruleExpression)
    }
    catch (error) {
      this.snackBar.open(`JSON rule expression was invalid!`, "Hide", { duration: 2000 });
      return
    }

    if (groupId.length == 0) {
      this.snackBar.open(`No Group Name provided`, "Hide", { duration: 2000 });
      return
    }
    var payload = {
      type: 'create',
      group_id: groupId,
      rules: ruleExpressionObj
    }
    this.loadingService.setLoadningState(true)
    this.supervisorService.sendCommand(MODULE_STORAGE_KEY, payload)
  }

}
