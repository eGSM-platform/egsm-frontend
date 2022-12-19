import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../loading.service';
import { SupervisorService } from '../supervisor.service';

const MODULE_STORAGE_KEY = 'aggregators'

@Component({
  selector: 'app-aggregators',
  templateUrl: './aggregators.component.html',
  styleUrls: ['./aggregators.component.scss']
})
export class AggregatorsComponent implements OnInit {
  readonly example_artifact_usage_statistic_processing = `
  {
    "type": "artifact-usage-statistic-processing",
    "monitoredartifacts": [{
        "type": "Truck",
        "id": "abc-123"
    }],
    "frequency": 10
  }`

  readonly example_artifact_unreliability_alert =`
  {
    "type": "artifact-unreliability-alert",
    "monitoredartifacts": [{
        "type": "Truck",
        "id": "abc-123"
    }],
    "faultinessthreshold":30,
    "windowsize":2,
    "notificationrules": ["NOTIFY_ALL"],
    "frequency": 10
  }`

  readonly example_process_deviation_detection =`
  {
    "type": "process-deviation-detection",
    "monitored": ["instance_1"],
    "monitoredprocessgroups":["group-1"],
    "notificationrules": ["NOTIFY_ALL"]
  }`

  eventSubscription: any
  noteColor = "lightgreen"
  constructor(private loadingService: LoadingService, private snackBar: MatSnackBar, private supervisorService: SupervisorService) {
    this.eventSubscription = this.supervisorService.NewProcessInstaceEventEmitter.subscribe((update: any) => {
      this.applyUpdate(update)
    })
  }

  ngOnInit(): void {
  }

  applyUpdate(update: any) {
    if (update['type'] == 'create') {
      this.loadingService.setLoadningState(false)
      if (update['result'] == 'created') {
        this.snackBar.open(`Job created successfully`, "Hide", { duration: 2000 });
      }
      else if (update['result'] == 'id_not_free') {
        this.snackBar.open(`Job with the specified ID already exists`, "Hide", { duration: 2000 });
      }
      else if (update['result'] == 'no_free_slot') {
        this.snackBar.open(`No free Job slot found`, "Hide", { duration: 2000 });
      }

    }
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe()
  }

  onCreate(jobID: string, jobDefinition: string) {
    this.snackBar.dismiss()
    this.loadingService.setLoadningState(true)
    if (jobID.length < 1 || jobID.includes('__') || jobID.includes('/') || jobID.includes('#')) {
      this.snackBar.open(`Invalid or empty ID (Can't contain: "__", "/" or "#" )`, "Hide", { duration: 2000 });
      this.loadingService.setLoadningState(false)
      return
    }
    if (jobDefinition.length < 1) {
      this.snackBar.open(`Job definition must be a valid JSON string`, "Hide", { duration: 2000 });
      this.loadingService.setLoadningState(false)
      return
    }
    else {
      var payload = {
        type: 'create',
        job_id: jobID,
        job_definition: JSON.parse(jobDefinition)
      }
      this.supervisorService.sendCommand(MODULE_STORAGE_KEY, payload)
    }
  }

}
