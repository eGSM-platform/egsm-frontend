import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-process-dialog',
  templateUrl: './delete-process-dialog.component.html',
  styleUrls: ['./delete-process-dialog.component.scss']
})
export class DeleteProcessDialogComponent{

  processId = ""
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DeleteProcessDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.processId = data.processId
  }

  onClick(result:boolean){
    this.dialogRef.close(result)
  }
}
