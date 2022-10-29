import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingState = new BehaviorSubject<boolean>(false);

  constructor() { }

  getLoadningState(){
    return this.loadingState.asObservable();
  }

  setLoadningState(newState:boolean){
    this.loadingState.next(newState);
  }
}
