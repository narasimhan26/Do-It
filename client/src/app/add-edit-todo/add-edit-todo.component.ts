import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-add-edit-todo',
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.css']
})
export class AddEditTodoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddEditTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any) {
      console.log(data);  
    }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}
