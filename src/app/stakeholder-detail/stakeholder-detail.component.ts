import { Component, OnInit } from '@angular/core';
import { Stakeholder } from '../primitives/primitives';

@Component({
  selector: 'app-stakeholder-detail',
  templateUrl: './stakeholder-detail.component.html',
  styleUrls: ['./stakeholder-detail.component.scss']
})
export class StakeholderDetailComponent implements OnInit {
  data = {} as Stakeholder

  constructor() { }

  ngOnInit(): void {

  }

  update(update:Stakeholder){
    this.data = update
  }

}