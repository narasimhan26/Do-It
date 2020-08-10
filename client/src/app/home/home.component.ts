import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../http.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditTodoComponent } from '../add-edit-todo/add-edit-todo.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  todos: any;
  title: string;
  description: string;

  constructor(private http: HttpService, public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) {
    this.todos = [];
  }

  ngOnInit(): void {
    this.http.get("http://localhost:3001/api/todos").subscribe(res => {
      this.todos = res.data;
    }, err => {
      console.log(err);
    })
  }

  showSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 3000,
    });
  }

  addTodo(todo: any): void {
    this.http.post("http://localhost:3001/api/todos", {
      ...todo
    }).subscribe(res => {
      this.todos.push(res.data);
      this.showSnackBar('Todo Added Successfully', 'Close');
    }, err => {
      console.log(err);
      this.showSnackBar('Failed to Add Todo', 'Close');
    });
  }

  editTodo(todo: any): void {
    this.http.put(`http://localhost:3001/api/todos/${todo._id}`, {
      ...todo
    }).subscribe(res => {
      let index = this.todos.findIndex(element => todo._id === element._id);
      this.todos[index] = res.data;
      this.showSnackBar('Todo Updated Successfully', 'Close');
    }, err => {
      console.log(err);
      this.showSnackBar('Failed to Update Todo', 'Close');
    })
  }

  deleteTodo(todo: any): void {
    this.http.delete(`http://localhost:3001/api/todos/${todo._id}`, {})
      .subscribe(res => {
        let index = this.todos.findIndex(element => todo._id === element._id);
        this.todos.splice(index, 1);
        this.showSnackBar('Todo Deleted Successfully', 'Close');
      }, err => {
        console.log(err);
        this.showSnackBar('Failed to Delete Todo', 'Close');
      })
  }

  openDialog(todo?: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      mode: 'Add',
      title: '',
      description: ''
    };
    if (todo) {
      dialogConfig.data = {
        mode: 'Edit',
        ...todo
      };
    }
    let dialogRef = this.dialog.open(AddEditTodoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value.mode === 'Edit') {
        this.editTodo(value);
      } else {
        this.addTodo(value);
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(["auth"]);
  }

}