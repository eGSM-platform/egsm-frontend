import { Component, Inject, OnInit, ViewChildren } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BpmnComponent } from '../bpmn/bpmn.component';
import { NewProcessInstanceDialogComponent } from '../library/new-process-instance-dialog/new-process-instance-dialog.component';
import { ProcessPerspective, TaskStatistics } from '../primitives/primitives';
import { SupervisorService } from '../supervisor.service';

const MODULE_STORAGE_KEY = 'process_type_detail'

@Component({
  selector: 'app-process-type-details',
  templateUrl: './process-type-details.component.html',
  styleUrls: ['./process-type-details.component.scss']
})
export class ProcessTypeDetailsComponent implements OnInit {
  eventSubscription: any
  diagramPerspectives: ProcessPerspective[] = []
  @ViewChildren('bpmn_diagrams') bpmnDiagrams: BpmnComponent[]

  constructor(public dialogRef: MatDialogRef<NewProcessInstanceDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar, private supervisorService: SupervisorService) {
    this.eventSubscription = this.supervisorService.ProcessTypeDetailEventEmitter.subscribe((update: any) => {
      this.applyUpdate(update)
    })
    this.requestProcessData(this.data.process_type_name)
  }

  applyUpdate(update: any) {
    if (update['result'] == 'ok') {
      this.diagramPerspectives = update['historic']['perspectives'] as ProcessPerspective[]
    }
    else {
      //this.snackBar.open(`Process created successfully, but error while creating related observation job!`, "Hide", { duration: 2000 });
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe()

  }

  onDiagramEvent(event: any) {
    if (event == 'INIT_DONE') {
      var context = this
      setTimeout(function () {
        context.diagramPerspectives.forEach(perspective => {
          var diagram = context.bpmnDiagrams.find(element => element.model_id == perspective.name)
          if (diagram) {
            var taskStatistics: TaskStatistics[] = []
            Object.keys(perspective['statistics']).forEach(e => {
              taskStatistics.push({
                id: e,
                values: perspective['statistics'][e]
              })
            });
            var perspectiveStatistic = { perspective: perspective.name, statistics: taskStatistics }
            diagram.updateStatistics(perspectiveStatistic)
          }

        });
      }, 1000);
    }
  }

  requestProcessData(processName: string) {
    var payload = {
      type: 'get_process_type_aggregation',
      process_type: processName
    }
    this.supervisorService.requestUpdate(MODULE_STORAGE_KEY, payload)
  }

}
