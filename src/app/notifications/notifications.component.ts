import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingService } from '../loading.service';
import { Stakeholder } from '../primitives/primitives';
import { SupervisorService } from '../supervisor.service';

const MODULE_STORAGE_KEY = 'notifications'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  eventSubscription: any
  stakeholders = new FormControl([]);
  live = new FormControl(true);
  historical = new FormControl(false);
  stakeholderList: Stakeholder[]

  dataSource = new MatTableDataSource<Notification>([]);
  displayedColumns: string[] = ['addressee', 'time', 'id', 'type', 'message', 'button'];

  constructor(private supervisorService: SupervisorService, private snackBar: MatSnackBar, public loadingService: LoadingService, public deleteProcessDialog: MatDialog) {
    this.eventSubscription = this.supervisorService.NotificationEventEmitter.subscribe((update: any) => {
      this.applyUpdate(update)
    })
    this.requestStakeholderList()
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.historical.value) {
      this.requestPastNotifications(this.stakeholders.value)
    }
    if (this.live.value) {
      let stakeholders = this.stakeholders.value

      this.subscribeToNotification(this.stakeholders.value)
    }
  }

  navigateToNotification(notification:string){
    
  }

  applyUpdate(update: any) {
    console.log(update)
    this.loadingService.setLoadningState(false)
    if (update['type'] == 'stakeholder_list') {
      this.stakeholderList = update['stakeholder_list']
    }
  }

  requestStakeholderList() {
    this.loadingService.setLoadningState(true)
    var payload = {
      type: 'get_stakeholder_list'
    }
    this.supervisorService.requestUpdate(MODULE_STORAGE_KEY, payload)
  }

  requestPastNotifications(stakeholders: any) {
    this.loadingService.setLoadningState(true)
    var payload = {
      stakeholders: stakeholders,
      type: 'get_past_notifications'
    }
    this.supervisorService.requestUpdate(MODULE_STORAGE_KEY, payload)
  }

  subscribeToNotification(stakeholders: any) {
    var payload = {
      stakeholders: stakeholders,
      type: 'subscribe_notifications'
    }
    console.log(payload)
    this.supervisorService.requestUpdate(MODULE_STORAGE_KEY, payload)
  }

}
