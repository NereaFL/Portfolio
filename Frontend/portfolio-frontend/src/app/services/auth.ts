import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config'; // 👈 Importa tu config

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly apiUrl = `${config.apiUrl}/api/auth`; // 👈 Base de tu backend

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { responseType: 'text' });
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  loggedIn(): boolean {
    return !!this.getToken();
  }

  clear() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
