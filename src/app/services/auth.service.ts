import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:8080'; // Reemplazar con el backend URL

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiURL}/authenticate`, credentials);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
