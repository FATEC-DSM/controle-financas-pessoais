import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss',
})
export class RegisterUserComponent {
  name: String = '';
  email: String = '';
  password: String = '';
  passConfirm: String = '';
  showPassword = false;
  strength = 0;

  isEqualPassword: Boolean = false;

  @ViewChild('passInput') passInputElement!: ElementRef;
  @ViewChild('confirmPassInput') confirmPassInputElement!: ElementRef;
  @ViewChild('progressBar') progressBarElement!: ElementRef;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  submitForm() {
    let credentials = {
      name: this.name,
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
    const type = this.showPassword ? 'text' : 'password';
    this.passInputElement.nativeElement.type = type;
    this.confirmPassInputElement.nativeElement.type = type;
  }

  passwordValidate(event: Event) {
    const pass = this.passInputElement.nativeElement.value;
    const progress = this.progressBarElement.nativeElement;
    let validators = {
      c1: false,
      c2: false,
      c3: false,
      c4: false,
    };

    // Critério 1: Mínimo de 8 caracteres
    if (pass.length >= 8 && !validators.c1) validators.c1 = true;
    else if (!validators.c1 && this.strength > 0) validators.c1 = false;

    // Critério 2: Pelo menos 1 letra maiúscula
    if (/[A-Z]/.test(pass) && !validators.c2) validators.c2 = true;
    else if (!validators.c1 && this.strength > 0) validators.c2 = false;

    // Critério 3: Pelo menos 1 número
    if (/\d/.test(pass) && !validators.c3) validators.c3 = true;
    else if (!validators.c3 && this.strength > 0) validators.c3 = false;

    // Critério 4: Pelo menos 1 caractere especial
    if (/[\W_]/.test(pass) && !validators.c4) validators.c4 = true;
    else if (!validators.c4 && this.strength > 0) validators.c4 = false;

    this.strength = 0;
    Object.entries(validators).forEach((item) => {
      const value = item[1];
      if (value) this.strength += 25;
    });

    switch (this.strength.toString()) {
      case '25':
        progress.style.backgroundColor = '#FF4C4C';
        break;
      case '50':
        progress.style.backgroundColor = '#FF9900';
        break;
      case '75':
        progress.style.backgroundColor = '#FFD700';
        break;
      case '100':
        progress.style.backgroundColor = '#4CAF50';
        break;
    }

    // // Critério 1: Mínimo de 8 caracteres
    // if (pass.length >= 8 && !valid.c1) {
    //   this.strength += 25;
    //   valid.c1 = true;
    // } else if (!valid.c1 && this.strength > 0) {
    //   this.strength = this.strength - 25;
    //   valid.c1 = false;
    // }

    // // Critério 2: Pelo menos 1 letra maiúscula
    // if (/[A-Z]/.test(pass) && !valid.c2) {
    //   this.strength += 0.25;
    //   valid.c2 = true;
    // } else if (!valid.c1 && this.strength > 0) {
    //   this.strength = this.strength - 25;
    //   valid.c2 = false;
    // }

    // // Critério 3: Pelo menos 1 número
    // if (/\d/.test(pass) && !valid.c3) {
    //   this.strength += 0.25;
    //   valid.c3 = true;
    // } else if (!valid.c3 && this.strength > 0) {
    //   this.strength = this.strength - 25;
    //   valid.c3 = false;
    // }

    // // Critério 4: Pelo menos 1 caractere especial
    // if (/[\W_]/.test(pass) && !valid.c4) {
    //   this.strength += 0.25;
    //   valid.c4 = true;
    // } else if (!valid.c4 && this.strength > 0) {
    //   this.strength = this.strength - 25;
    //   valid.c4 = false;
    // }

    progress.style.width = `${this.strength}%`;
  }

  haveAccount() {
    this.router.navigate(['/login']);
  }

  isEqualPasswordCheck() {
    this.isEqualPassword = this.passConfirm == this.password;
  }
}
