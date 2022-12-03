import { Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

const API_ENDPOINT = 'ws://localhost:8080'
const API_PROTOCOL = 'data-connection'

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {
  //Specific Event Services for each relevant modules
  @Output() OverviewEventEmitter: Subject<any> = new Subject();
  @Output() SystemInformationEventEmitter: Subject<any> = new Subject();
  @Output() WorkerDialogEventEmitter: Subject<any> = new Subject();
  @Output() ProcessSearchEventEmitter: Subject<any> = new Subject()
  @Output() LibraryEventEmitter: Subject<any> = new Subject()
  @Output() NewProcessInstaceEventEmitter: Subject<any> = new Subject()
  @Output() ArtifactInformationEventEmitter: Subject<any> = new Subject()
  @Output() StakeholderInformationEventEmitter: Subject<any> = new Subject()


  subject = webSocket({ url: API_ENDPOINT, protocol: API_PROTOCOL });

  constructor() {
    this.subject.subscribe({
      next: msg => this.messageHandler(msg), // Called whenever there is a message from the server.
      error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });
  }

  messageHandler(msg: any) {
    switch (msg['module']) {
      case 'overview':
        this.OverviewEventEmitter.next(msg['payload'])
        break;
      case 'system_information':
        this.SystemInformationEventEmitter.next(msg['payload'])
        break;
      case 'worker_detail':
        this.WorkerDialogEventEmitter.next(msg['payload'])
        break;
      case 'process_operation':
        this.ProcessSearchEventEmitter.next(msg['payload'])
        break;
      case 'process_library':
        this.LibraryEventEmitter.next(msg['payload'])
        break;
      case 'new_process_instance':
        this.NewProcessInstaceEventEmitter.next(msg['payload'])
        break;
      case 'artifact_detail':
        console.log('ok')
        this.ArtifactInformationEventEmitter.next(msg['payload'])
        break;
      case 'stakeholder_detail':
        console.log('ok')
        this.StakeholderInformationEventEmitter.next(msg['payload'])
        break;
    }
  }

  requestUpdate(module: string, payload: any = '') {
    let newMessage = {
      type: "update_request",
      module: module,
      payload: payload
    }
    this.subject.next(JSON.stringify(newMessage))
  }

  sendCommand(module: string, payload: any = '') {
    let newMessage = {
      type: "command",
      module: module,
      payload: payload
    }
    this.subject.next(JSON.stringify(newMessage))
  }
}
