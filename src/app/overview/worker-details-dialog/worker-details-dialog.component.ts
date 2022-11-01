import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WorkerElement } from '../overview.component';

@Component({
  selector: 'app-worker-details-dialog',
  templateUrl: './worker-details-dialog.component.html',
  styleUrls: ['./worker-details-dialog.component.scss']
})
export class WorkerDetailsDialogComponent implements AfterViewInit {
  displayedColumns: string[] = ['index', 'type', 'id', 'time', 'status'];
  dataSource = new MatTableDataSource<WorkerElement>(ENGINE_ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    //this.aggregatordataSource.paginator = this.aggregatorPaginator;
  }

  constructor(
    public dialogRef: MatDialogRef<WorkerDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  name: string;
}


const ENGINE_ELEMENT_DATA: WorkerElement[] = [
// { index: 1, name: 'Worker_1', engine_mumber: 7, capacity: 50, uptime: "00:00" },
// { index: 2, name: 'Worker_2', engine_mumber: 1, capacity: 50, uptime: "00:00" },
// { index: 3, name: 'Worker_3', engine_mumber: 0, capacity: 50, uptime: "00:00" },
// { index: 4, name: 'Worker_4', engine_mumber: 11, capacity: 50, uptime: "00:00" },
];