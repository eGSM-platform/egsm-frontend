import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  stakeholders = new FormControl('');
  stakeholderList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor() { }

  ngOnInit(): void {
  }

}

//TODO:VERIFY
export interface Notification {
  //index: Number, //Index in the table for visualization
  timestamp: string,
  id: string,

  notification_type: string,
  notification_message: string,
  notification_source_agent: string,
  notification_source_job: string,
  notification_addressee: string,
  
  process_group: string,
  processes: Process[],
}

export interface Process {
  type: string,
  id: string,
  description:string,
  engines: Engine[]
}

export interface Engine{

}
