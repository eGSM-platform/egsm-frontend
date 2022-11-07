import { Component, OnInit } from '@angular/core';
import { StorageServiceService } from '../storage-service.service';
import { SupervisorService } from '../supervisor.service';

const MODULE_STORAGE_KEY = 'system_information'

@Component({
  selector: 'app-system-information',
  templateUrl: './system-information.component.html',
  styleUrls: ['./system-information.component.scss']
})
export class SystemInformationComponent implements OnInit {
  systemUpTime: string
  workerNumber: number
  aggregatorNumber: number

  eventSubscription: any

  constructor(private supervisorService: SupervisorService, private storageService: StorageServiceService) {
  }

  ngOnInit(): void {
    if (this.storageService.hasKey(MODULE_STORAGE_KEY)) {
      this.eventSubscription = this.storageService.getSubject(MODULE_STORAGE_KEY).subscribe((update: any) => {
        this.applyUpdate(update)
      })
      this.storageService.triggerUpdate(MODULE_STORAGE_KEY)
    }
    else {
      this.storageService.addValue(MODULE_STORAGE_KEY, this.supervisorService.SystemInformationEventEmitter)
      this.systemUpTime = 'N/A'
      this.workerNumber = 0
      this.aggregatorNumber = 0
      this.eventSubscription = this.storageService.getSubject(MODULE_STORAGE_KEY).subscribe((update: any) => {
        this.applyUpdate(update)
      })
      this.supervisorService.requestUpdate(MODULE_STORAGE_KEY)
    }
  }

  applyUpdate(update: any) {
    this.systemUpTime = update['system_up_time']
    this.workerNumber = update['worker_number']
    this.aggregatorNumber = update['aggregator_number']
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe()
  }
}
