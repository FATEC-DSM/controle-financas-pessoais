import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss',
})
export class RecoverPasswordComponent {
  email: String = '';
  counter = 40;
  countdownStart = false;

  @ViewChild('buttonSubmit') buttonSubmit!: ElementRef;

  constructor(private router: Router) {}

  submitToRecover() {
    this.countdown();
  }

  countdown() {
    this.countdownStart = true;
    let idInterval: ReturnType<typeof setInterval>;

    this.buttonSubmit.nativeElement.disabled = true;

    idInterval = setInterval(() => {
      this.counter--;
      const end = this.counter === 0;

      if (end) clearInterval(idInterval);
      this.buttonSubmit.nativeElement.disabled = !end;
    }, 1000);
  }

  backLogin() {
    this.router.navigate(['/login']);
  }
}
