import { Injectable, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';

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

  subject = webSocket({ url: API_ENDPOINT, protocol: API_PROTOCOL });

  constructor() {
    this.subject.subscribe({
      next: msg => this.messageHandler(msg), // Called whenever there is a message from the server.
      error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });
  }

  messageHandler(msg: any) {
    console.log(msg)
    var message = msg//JSON.parse(msg)
    console.log(message)
    switch (message['module']) {
      case 'overview':
        this.OverviewEventEmitter.next(message['payload'])
        break;
      case 'system_information':
        this.SystemInformationEventEmitter.next(message['payload'])
        break;
      case 'worker_detail':
        this.WorkerDialogEventEmitter.next(message['payload'])
        break;
      case 'process_search':
        this.ProcessSearchEventEmitter.next(message['payload'])
        break;
      case 'library':

        break;
    }
  }

  requestUpdate(module: string, payload: any = '') {
    let newMessage = {
      type: "update_request",
      module: module,
      payload: payload
    }
    console.log('Sending: ' + JSON.stringify(newMessage))
    this.subject.next(JSON.stringify(newMessage))
  }

}
