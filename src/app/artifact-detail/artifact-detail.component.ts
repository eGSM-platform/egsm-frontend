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
    this.data.stakeholderstr = ''
    this.data.stakeholders.forEach(element => {
      this.data.stakeholderstr += element
      this.data.stakeholderstr += ';'
    });
  }
}
