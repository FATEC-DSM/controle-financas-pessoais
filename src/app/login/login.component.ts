import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { response } from 'express';

type Login = {
  email: String;
  password: String;
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: String = '';
  password: String = '';
  showPassword = false;
  // loginResponse$: Observable<any> = new Observable<any>();

  @ViewChild('passInput') passInputElement!: ElementRef;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // if (this.authService.isLoggedIn()) {
    //   this.router.navigate(['/recover']);
    // }
  }

  submitForm() {
    let credentials = {
      email: this.email,
      password: this.password,
    };

    this.authService
      .login(credentials)
      .pipe(
        catchError((error) => {
          return of(null); // Tratar o erro de forma reativa
        })
      )
      .subscribe((response) => console.log(response));
  }

  forgotPass() {
    this.router.navigate(['/recover']); // Redireciona para o dashboard
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    this.passInputElement.nativeElement.type = this.showPassword
      ? 'text'
      : 'password';
  }
}
