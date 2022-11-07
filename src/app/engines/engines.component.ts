import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EngineListComponent } from '../engine-list/engine-list.component';
import { LoadingService } from '../loading.service';
import { SupervisorService } from '../supervisor.service';

const MODULE_STORAGE_KEY = 'process_search'

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

  constructor(private supervisorService: SupervisorService, private snackBar: MatSnackBar, private loadingService: LoadingService) {
    this.eventSubscription = this.supervisorService.ProcessSearchEventEmitter.subscribe((update: any) => {
      this.applyUpdate(update)
    })
  }

  applyUpdate(update: any) {
    this.loadingService.setLoadningState(false)
    if (update['engines'].length > 0) {
      this.engineList.update(update['engines'])
      this.isResult = true
    }
    else {
      this.snackBar.open(`The requested Process Instance does not found!`, "Hide", { duration: 2000 });
      this.isResult = false
    }
  }

  onSearch(instance_id: any) {
    this.snackBar.dismiss()
    this.currentProcessId = instance_id
    this.requestEngineData()
  }

  requestEngineData() {
    this.loadingService.setLoadningState(true)
    var payload = {
      process_instance_id: this.currentProcessId
    }
    this.supervisorService.requestUpdate(MODULE_STORAGE_KEY, payload)
  }

}
