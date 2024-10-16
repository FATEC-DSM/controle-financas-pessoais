import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recover', component: RecoverPasswordComponent },
];
