import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artifact-detail',
  templateUrl: './artifact-detail.component.html',
  styleUrls: ['./artifact-detail.component.scss']
})
export class ArtifactDetailComponent implements OnInit {

  data = {} as  ArtifactDetail

  constructor() { }

  ngOnInit(): void {
  }

  update(newData:ArtifactDetail){
    this.data = newData
  }
}

export interface ArtifactDetail{
  artifacttype:string,
  artifactid:string,
  host:string,
  port:number,
  stakeholders:[],
  faultyrates:Object,
  timingfaultyrates: Object,
  //attached_to: string[]
}
