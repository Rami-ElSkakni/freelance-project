import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { BASE_URL } from 'src/app/Constants/BaseUrl';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent {
  registerSelected = false;
  loginForm: FormGroup;
  loading = false;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email field with validators
      password: ['', [Validators.required, Validators.minLength(6)]], // Password field with validators
    });
  }

  buttonClickedHandler() {
    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all fields correctly.',
      });
      return;
    }

    if (this.registerSelected) {
      this.RegisterUser();
    } else {
      this.LoginUser();
    }
  }

  LoginInsteadHandler() {
    this.registerSelected = !this.registerSelected;
  }

  RegisterUser() {
    const requestBody = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.loading = true;
    this.loginForm.disable();
    this.http
      .post(`${BASE_URL}/api/auth/register`, requestBody)
      .subscribe((response) => {
        console.log(response);
        this.loading = false;
        this.loginForm.enable();

        this.registerSelected = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Registration Successful',
          detail: 'You have successfully registered. Please login.',
        });
      });
  }

  LoginUser() {
    this.loading = true;
    const requestBody = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.loginForm.disable();
    this.http.post(`${BASE_URL}/api/auth/login`, requestBody).subscribe(
      (response) => {
        this.loginForm.enable();
        this.loading = false;
        // Handle success
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: 'You are now logged in.',
        });
        this.authService.login();
        this.router.navigate(['/admin']);
      },
      (error) => {
        this.loginForm.enable();
        this.loading = false;
        // Handle error
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Invalid email or password. Please try again.',
        });
      }
    );
  }
}
