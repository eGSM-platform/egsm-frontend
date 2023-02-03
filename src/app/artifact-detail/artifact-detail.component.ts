import { Component, OnInit } from '@angular/core';
import { Artifact } from '../primitives/primitives';

@Component({
  selector: 'app-artifact-detail',
  templateUrl: './artifact-detail.component.html',
  styleUrls: ['./artifact-detail.component.scss']
})
export class ArtifactDetailComponent implements OnInit {

  data = {} as  Artifact

  constructor() { }

  ngOnInit(): void {
  }

  update(newData:Artifact){
    this.data = newData
    this.data.stakeholders_str = ''
    this.data.stakeholders.forEach(element => {
      this.data.stakeholders_str += element
      this.data.stakeholders_str += ';'
    });
    this.data.faulty_rates_str = JSON.stringify(this.data.faulty_rates)
    this.data.timing_faulty_rates_str = JSON.stringify(this.data.timing_faulty_rates)
  }
}
