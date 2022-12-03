import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stakeholder-detail',
  templateUrl: './stakeholder-detail.component.html',
  styleUrls: ['./stakeholder-detail.component.scss']
})
export class StakeholderDetailComponent implements OnInit {
  data = {} as StakeholderDetail

  constructor() { }

  ngOnInit(): void {

  }

  update(update:StakeholderDetail){
    this.data = update
  }

}

export interface StakeholderDetail{
  id: string
}
