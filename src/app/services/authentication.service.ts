import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInterface } from '../login/login.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(body: LoginInterface): Observable<any> {
    console.log(body);
    return this.http.post(`${this.apiUrl}/auth`, body);
  }
}
