import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EngineDetailDialogComponent } from '../engine-detail-dialog/engine-detail-dialog.component';

@Component({
  selector: 'app-engine-list',
  templateUrl: './engine-list.component.html',
  styleUrls: ['./engine-list.component.scss']
})

export class EngineListComponent implements OnInit {
  @Input() hasSpinningBar: boolean
  isLoading = false
  dataSource = new MatTableDataSource<EngineElement>([]);
  displayedColumns: string[] = ['index', 'type', 'perspective', 'name', 'time', 'status', 'worker_host', 'worker_api_port', 'button'];
  constructor(public dialog: MatDialog) { }

  @ViewChild(MatPaginator) enginePaginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.enginePaginator;
  }

  ngOnInit(): void {
    this.isLoading = this.hasSpinningBar
  }

  update(newData: EngineElement[]) {
    this.isLoading = false
    this.dataSource.data = newData
  }

  navigateToEngine(element: any): void {
    const dialogRef = this.dialog.open(EngineDetailDialogComponent, {
      width: '100%',
      height: '100%',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

export interface EngineElement {
  index: Number,
  name: string;
  type: string,
  perspective: string,
  uptime: string,
  status: string,
  worker_host: string,
  worker_api_port: Number
}
