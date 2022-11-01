import { Component, OnInit } from '@angular/core';
import { SupervisorService } from '../supervisor.service';

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

  constructor(private supervisorService:SupervisorService) {
  }

  ngOnInit(): void {
    this.eventSubscription = this.supervisorService.SystemInformationEventEmitter.subscribe((update:any) => {
      console.log('System information update received')
      this.applyUpdate(update)
    })
    this.systemUpTime = 'N/A'
    this.workerNumber = 0
    this.aggregatorNumber = 0
    console.log('Request system_information')
    this.supervisorService.requestUpdate('system_information')
  }

  applyUpdate(update:any){
    this.systemUpTime = update['system_up_time']
    this.workerNumber = update['worker_number']
    this.aggregatorNumber = update['aggregator_number']
    console.log(this.systemUpTime)
  }

  ngOnDestroy(){
    this.eventSubscription.unsubscribe()
  }
}
