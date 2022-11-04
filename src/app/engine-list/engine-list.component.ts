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
  @Input() hasSpinningBar:boolean
  isLoading = false
  dataSource = new MatTableDataSource<EngineElement>([]);
  displayedColumns: string[] = ['index', 'type', 'perspective', 'name', 'time', 'status', 'button'];
  constructor(public dialog: MatDialog) { }

  @ViewChild(MatPaginator) enginePaginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.enginePaginator;
  }

  ngOnInit(): void {
    this.isLoading = this.hasSpinningBar
  }

  update(newData:EngineElement[]){
    this.isLoading = false
    this.dataSource.data = newData
  }

  navigateToEngine(name: any): void {
    const dialogRef = this.dialog.open(EngineDetailDialogComponent, {
      width: '100%',
      height: '100%',
      data: {
        name: name,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    //this.router.navigate(['/engines']);
    //this.dialogRef.close();
  }

}

export interface EngineElement {
  index: Number,
  name: string;
  type: string,
  perspective: string,
  uptime: string,
  status: string
}
