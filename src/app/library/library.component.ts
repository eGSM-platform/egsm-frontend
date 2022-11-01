import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WorkerElement } from '../overview/overview.component';
import { SupervisorService } from '../supervisor.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements AfterViewInit {
  displayedColumns: string[] = ['index', 'type', 'note', 'button'];
  dataSource = new MatTableDataSource<WorkerElement>(ENGINE_ELEMENT_DATA);

  fileName = ''
  constructor(public dialog: MatDialog, private supervisorService: SupervisorService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatPaginator) aggregatorPaginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    //this.aggregatordataSource.paginator = this.aggregatorPaginator;
  }

  removeProcess(name:string){
    ENGINE_ELEMENT_DATA.splice(0,1)
    console.log(ENGINE_ELEMENT_DATA)
    this.dataSource.paginator = this.paginator;
  }

  onFileSelected(event: any) {

  }

}

const ENGINE_ELEMENT_DATA: WorkerElement[] = [

];
