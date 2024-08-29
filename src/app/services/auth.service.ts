import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginRequest } from '@app/models/login-request';
import { Observable, tap } from 'rxjs';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';
import { Cliente } from '@app/models/cliente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  currentUserSignal = signal<string | null | undefined >(undefined);
  user = signal<Cliente | null>(null);

  constructor() {
    const user = localStorage.getItem('jwtToken');
    if (user) {
      let _user = JSON.parse(user);
      this.currentUserSignal.set(_user.token);
    }
  }

  register(cliente: Cliente): Observable<any> {
    return this.http.post(`${environment.baseUrl}/clientes`, cliente);
  }

  login( loginRequest: LoginRequest ): Observable<any> {
    return this.http.post(`${environment.baseUrl}/auth/login`, loginRequest).pipe(
      tap((response: any) => {
        const user = response;
        localStorage.setItem('jwtToken', JSON.stringify(user));
        this.currentUserSignal.set(user.token);
        this.router.navigate(['/']);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.currentUserSignal.set(null);
    this.router.navigate(['/login']);
  }

  getUser() {
    return this.currentUserSignal();
  }
}
