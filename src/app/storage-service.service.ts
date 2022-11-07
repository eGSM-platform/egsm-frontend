import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService implements OnDestroy {
  storage: Map<string, any>
  subscriptions: Map<string, any>
  eventEmitters: Map<string, any>

  constructor() {
    this.storage = new Map<string, string>()
    this.subscriptions = new Map<string, any>()
    this.eventEmitters = new Map<string, any>()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element.unsubscribe()
    });
    this.subscriptions.clear()
    this.storage.clear()
    this.eventEmitters.clear()
  }

  addValue(key: string, subject: Subject<any>): void {
    this.storage.set(key, undefined)
    this.subscriptions.set(key, subject.subscribe((update: any) => {
      this.messageHandler(key, update)
    }))
    this.eventEmitters.set(key, new Subject<any>())
  }

  hasKey(key: string): boolean {
    return this.storage.has(key)
  }

  getSubject(key: string): Subject<any> {
    return this.eventEmitters.get(key)
  }

  removeValue(key: string): void {
    this.subscriptions.get(key).unsubscribe()
    this.subscriptions.delete(key)
    this.storage.delete(key)
    this.eventEmitters.delete(key)
  }

  readValue(key: string): any {
    return this.storage.get(key)
  }

  triggerUpdate(key: string): void {
    this.messageHandler(key, this.storage.get(key))
  }

  messageHandler(key: string, message: string): void {
    if (this.storage.has(key)) {
      this.storage.set(key, message)
      this.eventEmitters.get(key).next(message)
    }
    else {
      console.log('Key does not exist in storage: ' + key)
    }
  }
}
