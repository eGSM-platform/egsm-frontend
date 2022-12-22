import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

const API_PROTOCOL = 'data-connection'

export class AggregatorConnector {
    socket = undefined
    observable = undefined
    public eventEmitter:EventEmitter<any>

    constructor() { }

    connect(host: string, port: number) {
        this.eventEmitter = new EventEmitter();
        this.socket = webSocket({ url: `ws://${host}:${port}`, protocol: API_PROTOCOL });
        this.observable = this.socket.subscribe({
            next: msg => this.messageHandler(msg), // Called whenever there is a message from the server.
            error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
            complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
        });
    }

    disconnect() {
        console.log('disconnected')
        this.observable.unsubscribe()
    }

    messageHandler(msg: any) {
        console.log(msg)
        switch (msg['type']) {
            case 'job_update':
                this.eventEmitter.emit(msg['payload'])
                break;
        }
    }

    subscribeJob(jobid: string) {
        let newMessage = {
            type: "job_update",
            payload: { job_id: jobid }
        }
        this.socket.next(JSON.stringify(newMessage))
    }

    getEventEmitter(){
        return this.eventEmitter
    }
}
