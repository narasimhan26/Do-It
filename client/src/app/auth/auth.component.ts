import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogin: boolean;

  constructor(private http: HttpService, private router: Router, private snakbar: MatSnackBar) { 
    this.isLogin = true;
  }

  loginForm: FormGroup
  registerForm: FormGroup
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]), 
      password: new FormControl('', Validators.required)
    });

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  toggleLogin(): void {
    this.isLogin = !this.isLogin;
  }

  handleLogin(): void {
    this.http.post("http://localhost:3001/api/users/signin", {
      ...this.loginForm.value
    }).subscribe(res => {
      localStorage.setItem("JWT_KEY", res.jwt);
      this.router.navigate(["home"]);
    }, err => {
      console.log(err);
      this.snakbar.open("Login Failed", "Close", {
        duration: 3000,
      });
    });
  }

  handleRegister(): void {
    this.http.post("http://localhost:3001/api/users/signup", {
      ...this.registerForm.value
    }).subscribe(res => {
      this.snakbar.open("Registerd Successfully", "Close", {
        duration: 3000,
      });
    }, err => {
      this.snakbar.open("Register failed", "Close", {
        duration: 3000,
      });
    });
  }

}
