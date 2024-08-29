import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginRequest } from '@app/models/login-request';
import { UserInterface } from '@app/models/user-interface';
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
  
  private user = signal<UserInterface | null>(null);

  constructor() {
    // Leer el token de localStorage cuando se inicializa el servicio
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.currentUserSignal.set(token); // Establecer el token en el signal si existe
    }
  }

  register(cliente: Cliente): Observable<any> {
    return this.http.post(`${environment.baseUrl}/clientes`, cliente);
  }

  login( loginRequest: LoginRequest ): Observable<any> {
    return this.http.post(`${environment.baseUrl}/auth/login`, loginRequest).pipe(
      tap((response: any) => {
        const token = response.token;
        if (token) {
          localStorage.setItem('jwtToken', token);
          this.currentUserSignal.set(token);
          this.router.navigate(['/']);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.currentUserSignal.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.user() !== null;
  }

  getUser() {
    return this.currentUserSignal();
  }

  // public onAuthStateChanged(callback: (user: any | null) => void) {
  //   return onAuthStateChanged(this.firebaeAuth, callback);
  // }
}
