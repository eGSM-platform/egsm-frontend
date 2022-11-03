import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-engines',
  templateUrl: './engines.component.html',
  styleUrls: ['./engines.component.scss']
})
export class EnginesComponent implements OnInit {

  currentEngineName:string = ""
  
  constructor(private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
  }

  onSearch(instance_id:any){
    this._snackBar.open(`The requested Process Instance does not found!`, "Hide");
  }

  getEngineData(){
    if(this.currentEngineName.length > 0){

    }
  }

}
