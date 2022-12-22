import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AggregatorConnector } from '../AggregatorConnector';
import { BpmnComponent } from '../bpmn/bpmn.component';
import { DeleteProcessDialogComponent } from '../delete-process-dialog/delete-process-dialog.component';
import { EngineListComponent } from '../engine-list/engine-list.component';
import { LoadingService } from '../loading.service';
import { ProcessPerspective } from '../primitives/primitives';
import { SupervisorService } from '../supervisor.service';

const MODULE_STORAGE_KEY = 'process_operation'

@Component({
  selector: 'app-engines',
  templateUrl: './engines.component.html',
  styleUrls: ['./engines.component.scss']
})
export class EnginesComponent {
  eventSubscription: any
  aggregatorEventSubscription: any
  currentProcessType: string = ""
  currentProcessId: string = ""
  currentBpmnJob: any = undefined
  diagramPerspectives: ProcessPerspective[] = []
  aggregator: AggregatorConnector = new AggregatorConnector()
  isResult: boolean = false

  @ViewChild('engines') engineList: EngineListComponent
  @ViewChildren('bpmn_diagrams') bpmnDiagrams: BpmnComponent[]

  constructor(private supervisorService: SupervisorService, private snackBar: MatSnackBar, private loadingService: LoadingService, public deleteProcessDialog: MatDialog) {
    this.eventSubscription = this.supervisorService.ProcessSearchEventEmitter.subscribe((update: any) => {
      this.applyUpdate(update)
    })
  }

  onTest() {
  }


  ngOnDestroy() {
    this.eventSubscription.unsubscribe()
    if (this.currentBpmnJob) {
      this.aggregatorEventSubscription.unsubscribe()
      this.aggregator.disconnect()
    }
  }

  applyUpdate(update: any) {
    this.loadingService.setLoadningState(false)
    var engines = update['engines'] || undefined
    var deleteResult = update['delete_result'] || undefined
    if (engines != undefined && engines.length > 0) {
      this.engineList.update(update['engines'])
      this.isResult = true
      this.currentProcessType = update['engines'][0].type
      console.log(update['bpmn_job'])
      if (update['bpmn_job'] != 'not_found') {
        this.currentBpmnJob = update['bpmn_job']
        this.aggregator.connect(this.currentBpmnJob.host, this.currentBpmnJob.port)
        this.aggregatorEventSubscription = this.aggregator.getEventEmitter().subscribe((data) => {
          console.log('new event ' + data['update']['perspectives']);
          this.diagramPerspectives = data['update']['perspectives'] as ProcessPerspective[]
          console.log(this.diagramPerspectives)
        });
        this.aggregator.subscribeJob(this.currentBpmnJob.job_id)
      }
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
    //this.bpmnDiagram.applyStatusReport([{ id: 'attach_container', color: '#fffff', flags: ['WARNING', "REPEATED"] },{ id: 'drive_to_terminal', color: '#7CFC00', flags: ['REPEATED'] }])
  }

  onSearch(instance_id: any) {
    this.snackBar.dismiss()
    this.currentProcessId = instance_id
    this.requestEngineData()
    if (this.currentBpmnJob) {
      this.aggregatorEventSubscription.unsubscribe()
      this.aggregator.disconnect()
      this.currentBpmnJob = undefined
      this.diagramPerspectives = []
    }
    //var truck = this.bpmnDiagrams.find(element => element.model_id == 'Truck')
    //truck.updateModelXml(DIAGRAM)
    //this.bpmnDiagrams.first.updateModelXml(DIAGRAM)
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
      process_type: this.currentProcessType,
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