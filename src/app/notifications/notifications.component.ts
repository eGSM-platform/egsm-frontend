import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  stakeholders = new FormControl('');
  historical = new FormControl(true);
  stakeholderList: Stakeholder[]

  constructor(private supervisorService: SupervisorService, private snackBar: MatSnackBar, private loadingService: LoadingService, public deleteProcessDialog: MatDialog) {
    this.eventSubscription = this.supervisorService.NotificationEventEmitter.subscribe((update: any) => {
      this.applyUpdate(update)
    })
    this.requestStakeholderList()
    
  }

  ngOnInit(): void {
  }

  onSelect(): void{
    console.log(this.stakeholders)
  }

  applyUpdate(update: any) {
    console.log(update)
    this.loadingService.setLoadningState(false)
    if(update['type'] == 'stakeholder_list'){
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
}
