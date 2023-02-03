import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EngineDetailDialogComponent } from '../engine-detail-dialog/engine-detail-dialog.component';
import { Engine } from '../primitives/primitives';

@Component({
  selector: 'app-engine-list',
  templateUrl: './engine-list.component.html',
  styleUrls: ['./engine-list.component.scss']
})

export class EngineListComponent implements OnInit {
  @Input() hasSpinningBar: boolean
  isLoading = false
  dataSource = new MatTableDataSource<Engine>([]);

  @ViewChild(MatPaginator) enginePaginator: MatPaginator;

  displayedColumns: string[] = ['index', 'type', 'perspective', 'name', 'time', 'status', 'worker_host', 'worker_api_port', 'button'];
  constructor(public dialog: MatDialog) { }


  ngAfterViewInit() {
    this.dataSource.paginator = this.enginePaginator;
  }

  ngOnInit(): void {
    this.isLoading = this.hasSpinningBar
  }

  /**
   * Updates the list of Engines showed bt the componenet
   * @param newData List of Engine-s to show
   */
  update(newData: Engine[]) {
    this.isLoading = false
    this.dataSource.data = newData
  }

  /**
   * Function to call when the Used press 'Navigate to Engine'
   * The finction will open a dialog with an EngineDetailDialogComponent
   * @param element Engine object to show in the dialog
   */
  navigateToEngine(element: Engine): void {
    this.dialog.open(EngineDetailDialogComponent, {
      width: '100%',
      height: '100%',
      data: element
    });
  }
}
