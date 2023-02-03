import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingService } from '../loading.service';
import { Stakeholder, StakeholderNotification } from '../primitives/primitives';
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
  subscribedTo: String[] = []

  dataSource = new MatTableDataSource<StakeholderNotification>();
  displayedColumns: String[] = ['notified', 'time', 'id', 'type', 'job_type', 'message', 'source_job', 'source_aggregator', "artifact_type", "artifact_id", "process_type", "process_id", 'button'];
  @ViewChild(MatPaginator) notificationPaginator: MatPaginator;

  constructor(private supervisorService: SupervisorService, public loadingService: LoadingService, public deleteProcessDialog: MatDialog) {
    this.eventSubscription = this.supervisorService.NotificationEventEmitter.subscribe((update: any) => {
      this.applyUpdate(update)
    })
    this.requestStakeholderList()
  }

  ngOnInit(): void {
  }

  ngAfterInit(): void {
    this.dataSource.paginator = this.notificationPaginator;
  }

  onSubmit(): void {
    if (this.historical.value) {
      this.requestPastNotifications(this.stakeholders.value)
    }
    if (this.live.value) {
      this.subscribeToNotification(this.stakeholders.value)
    }
  }

  navigateToNotification(notification: string) {

  }

  applyUpdate(update: any) {
    console.log(update)
    this.loadingService.setLoadningState(false)
    if (update['type'] == 'stakeholder_list') {
      this.stakeholderList = update['stakeholder_list']
    }
    else if (update['type'] == 'new_notification') {
      console.log('new notif')
      var data = this.dataSource.data
      data.unshift(update["notification"] as StakeholderNotification)
      this.dataSource.data = data
      //this.notificationPaginator._changePageSize( this.notificationPaginator.pageSize); 
    }
  }

  /**
   * Requests the list of defined Stakeholders from the back-end
   */
  requestStakeholderList() {
    this.loadingService.setLoadningState(true)
    var payload = {
      type: 'get_stakeholder_list'
    }
    this.supervisorService.requestUpdate(MODULE_STORAGE_KEY, payload)
  }

  /**
   * Requests historic notifications sent to the specified Stakeholders
   * @param stakeholders List of Stakeholders the notifications intended to
   */
  requestPastNotifications(stakeholders: any) {
    this.loadingService.setLoadningState(true)
    var payload = {
      stakeholders: stakeholders,
      type: 'get_past_notifications'
    }
    this.supervisorService.requestUpdate(MODULE_STORAGE_KEY, payload)
  }

  /**
   * Subscribe to future notifications sent to a defined set of Stakeholders
   * @param stakeholders A list of Stakeholder names
   */
  subscribeToNotification(stakeholders: any) {
    this.subscribedTo = stakeholders
    var payload = {
      stakeholders: stakeholders,
      type: 'subscribe_notifications'
    }
    this.supervisorService.requestUpdate(MODULE_STORAGE_KEY, payload)
  }
}
